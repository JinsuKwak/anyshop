"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { useFetch } from "@/hooks/useFetch";
import { MainDisplay } from "@/types/MainDisplay";
import { MainCarouselSkeleton } from "@/components/skeletons/MainCarouselSkeleton";
import { ErrorDisplay } from "@/components/placeholder/ErrorDisplay";
import { Button } from "../ui/button";
import { isEmptyString, isValidURL } from "@/utils/stringUtil";
import { useAuth } from "@/hooks/useAuth";
import ManagerEditButton from "../ui/ManagerEditButton";
import AddItemDisplay from "../placeholder/AddItemDisplay";
import { ImagePlus } from "lucide-react";

function MainCarousel({ editLink }: { editLink: string }) {
  const { isAuthenticated, role } = useAuth();

  const {
    data: items,
    error,
    loading,
  } = useFetch<MainDisplay[]>("api/main-display");

  if (loading) {
    return <MainCarouselSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full mx-auto mt-10">
        <ErrorDisplay message={error.message} className="aspect-4/1" />
      </div>
    );
  }

  const activeItems = items?.filter((i) => i.is_active).map((i) => i) ?? [];

  if (!activeItems || activeItems.length === 0) {
    if (isAuthenticated && role >= 2) {
      return (
        <AddItemDisplay
          editLink={editLink}
          className={"aspect-4/1"}
          AddIcon={ImagePlus}
          message="No items found. Click to add a new item."
        />
      );
    } else {
      return null;
    }
  }

  return (
    <div className="relative hidden sm:block">
      {isAuthenticated && role >= 2 && (
        <ManagerEditButton
          href={editLink}
          className="absolute top-6 right-6 z-20"
          label="Edit main carousel"
        />
      )}
      <Carousel
        className="w-10/10 mx-auto mt-10"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {activeItems.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-4">
                <Link href={item.link_url ? item.link_url : "#"}>
                  <Card className="overflow-hidden p-0">
                    <CardContent className="flex aspect-4/1 items-center justify-center relative">
                      {item.image_url && (
                        <Image
                          src={item.image_url}
                          alt={item.cta_label || "Carousel image"}
                          placeholder="blur"
                          blurDataURL={item.image_url} //TODO
                          fill={true}
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {!isEmptyString(item.cta_label) && (
                        <Button className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-primary)] shadow-none">
                          {item.cta_label}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default MainCarousel;
