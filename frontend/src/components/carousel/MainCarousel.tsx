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
import { MainDisplay } from "@/Types/MainDisplay";
import { MainCarouselSkeleton } from "@/components/skeletons/MainCarouselSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Button } from "../ui/button";
import { isEmptyString, isValidURL } from "@/utils/stringUtil";
import { sortByOrder } from "@/utils/sortUtils";

function MainCarousel() {
  const {
    data: items,
    error,
    loading,
  } = useFetch<MainDisplay[]>("/main-display");

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

  if (!items || items.length === 0) {
    // if user role is admin show message to add items TODO
    return null;
  }

  return (
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
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-4">
              <Link href={isValidURL(item.link_url) ? item.link_url : "#"}>
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
  );
}

export default MainCarousel;
