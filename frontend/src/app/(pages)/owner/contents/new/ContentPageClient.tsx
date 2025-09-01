"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";
import ContentPage from "@/components/content/ContentPage";
import { ContentPageSidebar } from "@/components/sidebar/ContentPageSidebar";
import type { ContentSummary } from "@/types";
import { useState } from "react";

interface ContentPageClientProps {
  allContents: ContentSummary[];
}

function ContentPageClient({ allContents }: ContentPageClientProps) {
  const contentSummary = { slug: "new", title: "New Content" };
  const [isEditing, setIsEditing] = useState(true);

  if (!contentSummary) return null;
  return (
    <TwoColumnLayout
      left={<ContentPageSidebar allContents={allContents} isEditing={false} />}
      right={
        <ContentPage
          contentSummary={contentSummary}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isNew={true}
        />
      }
    />
  );
}

export default ContentPageClient;
