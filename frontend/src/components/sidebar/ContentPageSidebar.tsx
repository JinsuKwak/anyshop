"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContentSummary } from "@/types";

interface ContentPageSidebarProps {
  allContents: ContentSummary[];
}

export function ContentPageSidebar({ allContents }: ContentPageSidebarProps) {
  const pathname = usePathname();
  const activeContent = pathname.split("/").pop();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-4">Contents</h3>{" "}
        <div className="flex flex-col space-y-1">
          {allContents.map((content) => (
            <Link
              href={`/contents/${content.slug}`}
              key={content.slug}
              passHref
            >
              <Button
                variant={activeContent === content.slug ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {content.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentPageSidebar;
