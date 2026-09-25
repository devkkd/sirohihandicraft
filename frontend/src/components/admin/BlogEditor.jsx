"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";
import "quill-table-better/dist/quill-table-better.css";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 border border-[#ddd5c8] rounded-xl flex items-center justify-center text-sm text-[#9e8f7e]">
        Loading editor...
      </div>
    ),
  }
);

const BlogEditor = forwardRef(function BlogEditor(
  { value, onChange },
  ref
) {
  const quillRef = useRef(null);
  const [modules, setModules] = useState(null);

  useEffect(() => {
    let mounted = true;

    const setupEditor = async () => {
      try {
        const quillModule = await import("quill");
        const Quill = quillModule.default || quillModule;

        const tableModule = await import("quill-table-better");
        const QuillTableBetter =
          tableModule.default || tableModule.QuillTableBetter;

        if (!QuillTableBetter) {
          console.error("QuillTableBetter module not found.");
          return;
        }

        Quill.register(
          { "modules/table-better": QuillTableBetter },
          true
        );

        if (!mounted) return;

        setModules({
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["blockquote"],
              ["link"],
              ["table-better"],
              ["clean"],
            ],
          },
          table: false,
          "table-better": {
            language: "en_US",
            menus: [
              "column",
              "row",
              "merge",
              "table",
              "cell",
              "wrap",
              "copy",
              "delete",
            ],
            toolbarTable: true,
            toolbarButtons: {
              whiteList: [
                "bold",
                "italic",
                "underline",
                "strike",
                "link",
              ],
              singleWhiteList: [
                "bold",
                "italic",
                "underline",
                "strike",
                "link",
              ],
            },
          },
          clipboard: {
            matchVisual: false,
          },
          keyboard: {
            bindings: QuillTableBetter.keyboardBindings,
          },
        });
      } catch (error) {
        console.error("Quill setup failed:", error);
      }
    };

    setupEditor();

    return () => {
      mounted = false;
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "blockquote",
    "link",
  ];

  useImperativeHandle(
    ref,
    () => ({
      getHTML() {
        const quill = quillRef.current?.getEditor?.();

        if (!quill) {
          return value || "";
        }

        try {
          const tableModule = quill.getModule("table-better");

          if (
            tableModule &&
            typeof tableModule.deleteTableTemporary === "function"
          ) {
            tableModule.deleteTableTemporary();
          }

          if (typeof quill.getSemanticHTML === "function") {
            return quill.getSemanticHTML();
          }

          return quill.root?.innerHTML || "";
        } catch (error) {
          console.error("Failed to get blog HTML:", error);
          return quill.root?.innerHTML || value || "";
        }
      },

      getQuill() {
        return quillRef.current?.getEditor?.() || null;
      },
    }),
    [value]
  );

  if (!modules) {
    return (
      <div className="blog-editor-wrapper">
        <div className="h-64 border border-[#ddd5c8] rounded-xl flex items-center justify-center text-sm text-[#9e8f7e]">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className="blog-editor-wrapper">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content here..."
      />

      <style jsx global>{`
        .blog-editor-wrapper .ql-toolbar {
          border: 1px solid #ddd5c8;
          border-radius: 12px 12px 0 0;
          background: #f8f4ef;
          padding: 10px;
        }

        .blog-editor-wrapper .ql-snow .ql-picker {
          color: #615236;
        }

        .blog-editor-wrapper .ql-snow .ql-picker-options {
          background: #fffdf9;
          border-color: #ddd5c8;
        }

        .blog-editor-wrapper .ql-snow .ql-stroke {
          stroke: #615236;
        }

        .blog-editor-wrapper .ql-snow .ql-fill {
          fill: #615236;
        }

        .blog-editor-wrapper .ql-snow button:hover .ql-stroke {
          stroke: #4d4233;
        }

        .blog-editor-wrapper .ql-snow button:hover .ql-fill {
          fill: #4d4233;
        }

        .blog-editor-wrapper .ql-container {
          border: 1px solid #ddd5c8;
          border-top: 0;
          border-radius: 0 0 12px 12px;
          background: #ffffff;
          min-height: 350px;
          font-family: "MonaSans", Arial, sans-serif;
          font-size: 14px;
          color: #3b2f1e;
        }

        .blog-editor-wrapper .ql-editor {
          min-height: 350px;
          padding: 18px;
          line-height: 1.8;
          font-family: "MonaSans", Arial, sans-serif;
          color: #3b2f1e;
          overflow-wrap: anywhere;
        }

        .blog-editor-wrapper .ql-editor.ql-blank::before {
          color: #c4b9ac;
          font-style: normal;
          font-family: "MonaSans", Arial, sans-serif;
        }

        .blog-editor-wrapper .ql-editor h1,
        .blog-editor-wrapper .ql-editor h2,
        .blog-editor-wrapper .ql-editor h3,
        .blog-editor-wrapper .ql-editor h4 {
          font-family: "Cormorant Garamond", serif;
          color: #5c4f3d;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .blog-editor-wrapper .ql-editor strong,
        .blog-editor-wrapper .ql-editor b {
          color: #111111;
          font-weight: 700;
        }

        .blog-editor-wrapper .ql-editor em,
        .blog-editor-wrapper .ql-editor i {
          font-style: italic;
        }

        .blog-editor-wrapper .ql-editor u {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .blog-editor-wrapper .ql-editor a {
          color: #2563eb;
          font-weight: 700;
          text-decoration: underline;
          text-decoration-color: #2563eb;
          text-underline-offset: 3px;
          overflow-wrap: anywhere;
        }

        .blog-editor-wrapper .ql-editor a:hover {
          color: #1d4ed8;
        }

        .blog-editor-wrapper .ql-editor blockquote {
          margin: 24px 0;
          padding: 14px 18px;
          border-left: 3px solid #d2c4b3;
          background: #fbf3e6;
          color: #4a4238;
          font-family: "Cormorant Garamond", serif;
          font-size: 20px;
          line-height: 1.5;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table {
          width: 100%;
          max-width: 100%;
          margin: 28px 0;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table table {
          width: 100%;
          min-width: 600px;
          border-collapse: collapse;
          border-spacing: 0;
          background: #fffdf9;
          border: 1px solid #d2c4b3;
          font-family: "MonaSans", Arial, sans-serif;
          font-size: 13px;
          line-height: 1.55;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table th {
          padding: 13px 15px;
          border: 1px solid #d2c4b3;
          background: #f5eee5;
          color: #111111;
          font-weight: 700;
          text-align: left;
          vertical-align: middle;
          overflow-wrap: break-word;
          word-break: normal;
          word-spacing: normal;
          hyphens: none;
          white-space: normal;
          min-width: 110px;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table td {
          padding: 13px 15px;
          border: 1px solid #e0dacd;
          background: #fffdf9;
          color: #5e554d;
          font-weight: 400;
          text-align: left;
          vertical-align: top;
          overflow-wrap: break-word;
          word-break: normal;
          word-spacing: normal;
          hyphens: none;
          white-space: normal;
          min-width: 110px;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table tbody tr:nth-child(even) td {
          background: #fcf8f3;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table strong,
        .blog-editor-wrapper .ql-editor .qlbt-table b {
          color: #111111;
          font-weight: 700;
        }

        .blog-editor-wrapper .ql-editor .qlbt-table a {
          color: #2563eb;
          font-weight: 700;
          text-decoration: underline;
        }

        .ql-table-better-toolbar {
          z-index: 9999 !important;
          background: #fffdf9 !important;
          border: 1px solid #ddd5c8 !important;
          border-radius: 10px !important;
          box-shadow: 0 8px 30px rgba(60, 45, 30, 0.12);
        }

        .ql-table-better-operation-menu {
          z-index: 10000 !important;
          background: #fffdf9 !important;
          border: 1px solid #ddd5c8 !important;
          border-radius: 10px !important;
        }

        @media (max-width: 768px) {
          .blog-editor-wrapper .ql-toolbar {
            padding: 8px;
            overflow-x: auto;
          }

          .blog-editor-wrapper .ql-editor {
            min-height: 300px;
            padding: 14px;
            font-size: 14px;
          }

          .blog-editor-wrapper .ql-editor .qlbt-table {
            width: 100%;
            overflow-x: auto;
          }

          .blog-editor-wrapper .ql-editor .qlbt-table table {
            min-width: 600px;
          }

          .blog-editor-wrapper .ql-editor .qlbt-table th,
          .blog-editor-wrapper .ql-editor .qlbt-table td {
            padding: 10px 12px;
          }
        }

        @media (max-width: 480px) {
          .blog-editor-wrapper .ql-editor .qlbt-table table {
            min-width: 560px;
          }

          .blog-editor-wrapper .ql-editor .qlbt-table th,
          .blog-editor-wrapper .ql-editor .qlbt-table td {
            padding: 9px 10px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
});

export default BlogEditor;
