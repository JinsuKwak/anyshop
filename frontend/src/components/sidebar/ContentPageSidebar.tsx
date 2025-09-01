"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContentSummary } from "@/types";
import { useRouter } from "next/navigation";

interface ContentPageSidebarProps {
  allContents: ContentSummary[];
  isEditing: boolean;
}

export function ContentPageSidebar({
  allContents,
  isEditing,
}: ContentPageSidebarProps) {
  const pathname = usePathname();
  const activeContent = pathname.split("/").pop();
  const router = useRouter();
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
          {isEditing && (
            <div
              className="w-full justify-start flex flex-col items-center p-4 mt-2 border border-dashed rounded-md text-muted-foreground cursor-pointer transition hover:text-neutral-500 hover:bg-neutral-100"
              onClick={() => {
                router.push("/owner/contents/new");
              }}
            >
              <div className="text-3xl">＋</div>
              <p className="text-sm">Add New Content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentPageSidebar;
