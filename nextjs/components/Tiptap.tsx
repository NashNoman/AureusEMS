"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function Tiptap({
  content,
  onUpdate,
}: {
  content: string;
  onUpdate: (text: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    parseOptions: {
      preserveWhitespace: "full",
    },
    editorProps: {
      attributes: {
        class:
          "pt-1 pb-3 px-2 font-semibold rounded-lg outline-none focus:bg-accent text-semibold",
      },
    },
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content]);

  return <EditorContent editor={editor} />;
}
