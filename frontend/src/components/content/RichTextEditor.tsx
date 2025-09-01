"use client";

import { Button } from "@/components/ui/button";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "../ui/minimal-tiptap";
import { useState } from "react";

interface RichTextEditorProps {
  initialContent: Content;
  onChange: (content: Content) => void;
  viewOnly: boolean;
  showToolbar: boolean;
}

const RichTextEditor = ({
  initialContent,
  onChange,
  viewOnly,
  showToolbar,
}: RichTextEditorProps) => {
  return (
    <div>
      <MinimalTiptapEditor
        key={viewOnly ? "readonly" : "editable"}
        value={initialContent}
        onChange={onChange}
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
    </div>
  );
};

export default RichTextEditor;
