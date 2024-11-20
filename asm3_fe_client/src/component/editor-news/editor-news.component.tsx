import { observer } from "mobx-react";
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { newsFormStore } from "../../stores";
import "./quill-custom.style.css";
import { API_ENDPOINT } from "../../apis";

export const EditorNews: React.FC = observer(() => {
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["image"],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ color: [] }, { background: [] }],
        ],
        handlers: {
          image: imageHandler, // Custom image handler
        },
      },
    }),
    []
  );

  const handleHtmlChange = (value: string) => {
    // newsFormStore.setField("htmlContent", value);
  };

  function imageHandler() {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection();
    const value = prompt("Please enter the image URL");

    if (value && range) {
      const fullUrl = `${API_ENDPOINT}${value}`;

      editor.insertEmbed(range.index, "image", fullUrl, "user");
    }
  }

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      // value={newsFormStore.formData.htmlContent}
      onChange={handleHtmlChange}
      modules={modules}
      className="custom-quill border-b-2 focus:border-blue-600"
    />
  );
});
