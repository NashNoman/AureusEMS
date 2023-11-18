"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Tiptap({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    injectCSS: false,
    parseOptions: {
      preserveWhitespace: "full",
    },
    editorProps: {
      attributes: {
        class:
          "py-1 px-2 mx-2 my-6 font-semibold rounded-lg outline-none focus:bg-accent text-semibold",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
