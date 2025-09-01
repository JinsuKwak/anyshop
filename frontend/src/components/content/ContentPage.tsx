// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { isAtLeast, ROLE } from "@/utils/rolesUtil";
// import RichTextEditor from "./RichTextEditor";
// import { ContentSummary } from "@/types";
// import { useFetch } from "@/hooks/useFetch";
// import { Content } from "@/types/Content";
// import PageSkeletion from "../skeletons/PageSkeletion";
// import { ErrorDisplay } from "../placeholder/ErrorDisplay";
// import ManagerActionButton from "../button/ManagerActionButton";
// import { Trash2 } from "lucide-react";
// import { Content as EditorContent } from "@tiptap/react";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// interface ContentPageProps {
//   contentSummary: ContentSummary;
// }

// const IMMUTABLE_CONTENT_SLUGS = ["about", "contact"];

// export default function ContentPageProps({ contentSummary }: ContentPageProps) {
//   const apiPath = `/api/contents/${contentSummary.slug}`;
//   const { role } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const { data, error, loading } = useFetch<Content>(apiPath);
//   const [content, setContent] = useState<EditorContent>();
//   const [title, setTitle] = useState<string>(contentSummary.title);

//   useEffect(() => {
//     if (data) {
//       setContent(data.content);
//     }
//   }, [data]);

//   const handleSave = async (newTitle: string, newContent: EditorContent) => {
//     console.log(newContent);
//     try {
//       const response = await fetch(apiPath, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newContent }),
//       });

//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);

//       setContent(newContent);
//       setIsEditing(false);
//     } catch (error) {
//       console.error(`Failed to save ${contentSummary.title} content`, error);
//     }
//   };

//   const canEdit = isAtLeast(role, ROLE.OWNER);

//   if (loading) {
//     return <PageSkeletion className="h-[70vh]" />;
//   }

//   if (error) {
//     return <ErrorDisplay message="" className="h-[70vh]" />;
//   }

//   return (
//     <>
//       {/* Breadcrumbs */}
//       <div className="space-y-4">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/contents/about">Contents</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>{data?.title}</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <div className="flex justify-between items-center mb-4">
//           {canEdit &&
//           isEditing &&
//           !IMMUTABLE_CONTENT_SLUGS.includes(contentSummary.slug) ? (
//             <input
//               type="text"
//               value={contentSummary.title}
//               autoFocus
//               onChange={(e) => {
//                 // setTitle(e.target.value) 등으로 처리
//               }}
//               className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
//             />
//           ) : (
//             <h1 className="text-3xl font-bold">{contentSummary.title}</h1>
//           )}

//           {canEdit && !IMMUTABLE_CONTENT_SLUGS.includes(contentSummary.slug) ? (
//             isEditing ? (
//               <ManagerActionButton
//                 onClick={() => console.log("Delete clicked")}
//                 buttonActionType="destructive"
//                 Icon={Trash2}
//               >
//                 Delete
//               </ManagerActionButton>
//             ) : (
//               <ManagerActionButton
//                 onClick={() => setIsEditing(true)}
//                 buttonActionType="default"
//               >
//                 Edit
//               </ManagerActionButton>
//             )
//           ) : (
//             !isEditing && (
//               <ManagerActionButton
//                 onClick={() => setIsEditing(true)}
//                 buttonActionType="default"
//               >
//                 Edit
//               </ManagerActionButton>
//             )
//           )}
//         </div>
//       </div>
//       <div className={`mx-auto ${!isEditing && "mb-8"}`}>
//         {isEditing && canEdit ? (
//           <RichTextEditor
//             initialContent={content ?? ""}
//             onChange={setContent}
//             viewOnly={false}
//             showToolbar={true}
//           />
//         ) : (
//           <RichTextEditor
//             initialContent={content ?? ""}
//             onChange={setContent}
//             viewOnly={true}
//             showToolbar={false}
//           />
//         )}
//       </div>

//       {isEditing && canEdit && (
//         <div className="flex justify-end gap-2 mt-4 mb-8">
//           <ManagerActionButton onClick={() => setIsEditing(false)} textOnly>
//             Cancel
//           </ManagerActionButton>
//           <ManagerActionButton
//             onClick={() => {
//               if (content !== undefined) {
//                 handleSave(title, content);
//               }
//             }}
//             buttonActionType="action"
//             textOnly
//           >
//             Save
//           </ManagerActionButton>
//         </div>
//       )}
//     </>
//   );
// }

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
import { Content as EditorContent } from "@tiptap/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const IMMUTABLE_CONTENT_SLUGS = ["about", "contact"];

interface ContentPageProps {
  contentSummary: ContentSummary;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isNew?: boolean;
}

export default function ContentPage({
  contentSummary,
  isEditing,
  isNew,
  setIsEditing,
}: ContentPageProps) {
  const apiPath = `/api/contents/${contentSummary.slug}`;
  const { role } = useAuth();
  const canEdit = isAtLeast(role, ROLE.OWNER);
  const { data, error, loading } = useFetch<Content>(apiPath);
  const [content, setContent] = useState<EditorContent>();
  const [title, setTitle] = useState(contentSummary.title);

  useEffect(() => {
    if (isNew) {
      setContent("");
    } else if (!isNew && data) {
      setContent(data.content);
    }
  }, [isNew, data]);

  const handleSave = async (newTitle: string, newContent: EditorContent) => {
    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      setContent(newContent);
      setIsEditing(false);
    } catch (error) {
      console.error(`Failed to save ${title}`, error);
    }
  };

  if (loading) return <PageSkeletion className="h-[70vh]" />;
  if (error && !isNew) return <ErrorDisplay message="" className="h-[70vh]" />;

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
              <BreadcrumbPage>{contentSummary?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title Input or Display */}
        <div className="flex justify-between items-center mb-4">
          {canEdit &&
          isEditing &&
          !IMMUTABLE_CONTENT_SLUGS.includes(contentSummary.slug) ? (
            <input
              type="text"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold">{title}</h1>
          )}

          {/* Action Buttons */}
          {canEdit && !IMMUTABLE_CONTENT_SLUGS.includes(contentSummary.slug) ? (
            isEditing ? (
              <ManagerActionButton
                onClick={() => console.log("Delete clicked")}
                buttonActionType="destructive"
                Icon={Trash2}
              >
                Delete
              </ManagerActionButton>
            ) : (
              <ManagerActionButton
                onClick={() => setIsEditing(true)}
                buttonActionType="default"
              >
                Edit
              </ManagerActionButton>
            )
          ) : (
            !isEditing && (
              <ManagerActionButton
                onClick={() => setIsEditing(true)}
                buttonActionType="default"
              >
                Edit
              </ManagerActionButton>
            )
          )}
        </div>
      </div>

      {/* RichTextEditor */}
      <div className={`mx-auto ${!isEditing && "mb-8"}`}>
        <RichTextEditor
          initialContent={content ?? ""}
          onChange={setContent}
          viewOnly={!isEditing}
          showToolbar={isEditing}
        />
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && canEdit && (
        <div className="flex justify-end gap-2 mt-4 mb-8">
          <ManagerActionButton onClick={() => setIsEditing(false)} textOnly>
            Cancel
          </ManagerActionButton>
          <ManagerActionButton
            onClick={() => content && handleSave(title, content)}
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
