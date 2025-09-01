"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";
import ContentPage from "@/components/content/ContentPage";
import { ContentPageSidebar } from "@/components/sidebar/ContentPageSidebar";
import type { ContentSummary } from "@/types";
import { ROLE, isAtLeast } from "@/utils/rolesUtil";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface ContentPageClientProps {
  contentSlug: string;
  allContents: ContentSummary[];
}

function ContentPageClient({
  contentSlug,
  allContents,
}: ContentPageClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const contentSummary = allContents?.find((cont) => cont.slug === contentSlug);

  useEffect(() => {
    if (!contentSummary) {
      router.replace("/");
    }
  }, [contentSummary, router]);

  if (!contentSummary) return null;
  return (
    <TwoColumnLayout
      left={
        <ContentPageSidebar allContents={allContents} isEditing={isEditing} />
      }
      right={
        <ContentPage
          contentSummary={contentSummary}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      }
    />
  );
}

export default ContentPageClient;
