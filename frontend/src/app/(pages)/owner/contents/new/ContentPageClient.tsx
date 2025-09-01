"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";
import ContentPage from "@/components/content/ContentPage";
import { ContentPageSidebar } from "@/components/sidebar/ContentPageSidebar";
import type { ContentSummary } from "@/types";

interface ContentPageClientProps {
  contentSlug: string;
  allContents: ContentSummary[];
}

function ContentPageClient({
  contentSlug,
  allContents,
}: ContentPageClientProps) {
  const router = useRouter();

  const contentSummary = allContents?.find((cont) => cont.slug === contentSlug);

  useEffect(() => {
    if (!contentSummary) {
      router.replace("/");
    }
  }, [contentSummary, router]);

  if (!contentSummary) return null;
  return (
    <TwoColumnLayout
      left={<ContentPageSidebar allContents={allContents} />}
      right={<ContentPage contentSummary={contentSummary} />}
    />
  );
}

export default ContentPageClient;
