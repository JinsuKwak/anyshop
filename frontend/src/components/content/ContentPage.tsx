"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isAtLeast, ROLE } from "@/utils/rolesUtil";
import RichTextEditor from "./RichTextEditor";
import { ContentSummary } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { Content } from "@/types/Content";
import PageSkeletion from "../skeletons/PageSkeletion";
import { ErrorDisplay } from "../placeholder/ErrorDisplay";
import ManagerActionButton from "../button/ManagerActionButton";
import { Trash2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ContentPageProps {
  contentSummary: ContentSummary;
}

export default function ContentPageProps({ contentSummary }: ContentPageProps) {
  const apiPath = `/api/contents/${contentSummary.slug}`;
  const { role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { data, error, loading } = useFetch<Content>(apiPath);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
  }, [data]);

  const handleSave = async (newContent: string) => {
    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      setContent(newContent);
      setIsEditing(false);
    } catch (error) {
      console.error(`Failed to save ${contentSummary.title} content`, error);
    }
  };

  const canEdit = isAtLeast(role, ROLE.OWNER);

  if (loading) {
    return <PageSkeletion className="h-[70vh]" />;
  }

  if (error) {
    return <ErrorDisplay message="" className="h-[70vh]" />;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/contents/about">Contents</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between items-center mb-4">
          {canEdit && isEditing ? (
            <input
              type="text"
              value={contentSummary.title}
              autoFocus
              onChange={(e) => {
                // 만약 title도 수정 가능하게 만들고 싶다면,
                // setContentSummaryTitle(e.target.value) 등으로 처리
                // contentSummary.slug 가 about / contact 라면 삭제 아이콘 + 제목 수정 불가
              }}
              className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold">{contentSummary.title}</h1>
          )}

          {canEdit && (
            <ManagerActionButton
              onClick={() => {
                if (!isEditing) setIsEditing(true);
                else console.log("clicked");
              }}
              buttonActionType={isEditing ? "destructive" : "default"}
              Icon={isEditing ? Trash2 : undefined}
            >
              {isEditing ? "Delete" : "Edit"}
            </ManagerActionButton>
          )}
        </div>
      </div>
      <div className={`mx-auto ${!isEditing && "mb-8"}`}>
        {isEditing && canEdit ? (
          <RichTextEditor
            initialContent={content}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            viewOnly={false}
            showToolbar={true}
          />
        ) : (
          <RichTextEditor
            initialContent={content}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            viewOnly={true}
            showToolbar={false}
          />
        )}
      </div>

      {isEditing && canEdit && (
        <div className="flex justify-end gap-2 mt-4 mb-8">
          <ManagerActionButton onClick={() => setIsEditing(false)} textOnly>
            Cancel
          </ManagerActionButton>
          <ManagerActionButton
            onClick={() => console.log("clicked")}
            buttonActionType="action"
            textOnly
          >
            Save
          </ManagerActionButton>
        </div>
      )}
    </>
  );
}
