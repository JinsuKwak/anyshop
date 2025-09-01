"use client";

import { Button } from "@/components/ui/button";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "../ui/minimal-tiptap";
import { useState } from "react";
import { Delayed } from "@/utils/Delayed";

interface RichTextEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
  viewOnly: boolean;
  showToolbar: boolean;
  title?: boolean;
}

const RichTextEditor = ({
  initialContent,
  onSave,
  onCancel,
  viewOnly,
  showToolbar,
}: RichTextEditorProps) => {
  const [value, setValue] = useState<Content>(initialContent);

  return (
    <div>
      {/* <Delayed delay={1000} fallback={<div>Loading...</div>}> */}
      <MinimalTiptapEditor
        key={viewOnly ? "readonly" : "editable"}
        value={value}
        onChange={setValue}
        className={`w-full min-h-[50vh]`}
        editorContentClassName="p-5"
        output="html"
        placeholder="Start writing here..."
        autofocus={false}
        editable={!viewOnly}
        viewOnly={viewOnly}
        showToolbar={showToolbar}
        editorClassName="focus:outline-hidden"
      />
      {/* </Delayed> */}
    </div>
  );
};

export default RichTextEditor;
