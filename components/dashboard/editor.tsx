"use client";

import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MyRichTextEditor = ({ onChange, value }: EditorProps) => {
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState(value);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(content);
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        setContent(html);
        onChange(html);
      });
    }
  }, [quill]);
  return (
    <div className="bg-white dark:bg-black">
      <div ref={quillRef} />
    </div>
  );
};

export default MyRichTextEditor;
