import ContentPageClient from "./ContentPageClient";
import type { ContentSummary } from "@/types";
import { ErrorDisplay } from "@/components/placeholder/ErrorDisplay";

export default async function Page(context: { params: { content: string } }) {
  const { content } = await context.params;

  let contents: ContentSummary[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORE_API}/api/contents/lists`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    contents = await res.json();
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return (
      <div className="w-full mx-auto mt-10 container mt-30">
        <ErrorDisplay message={errorMessage} className="h-[50vh]" />
      </div>
    );
  }

  const allContents = [...contents];

  return <ContentPageClient contentSlug={content} allContents={allContents} />;
}
