"use client"

import dynamic from "next/dynamic"
import { useCallback, useMemo } from "react"
import "@mdxeditor/editor/style.css"
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  listsPlugin,
  ListsToggle,
  quotePlugin,
  toolbarPlugin,
  tablePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  diffSourcePlugin,
  // Toolbar Components
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  UndoRedo,
  Separator,
  ConditionalContents,
  DiffSourceToggleWrapper,
  imagePlugin,
  InsertImage,
} from "@mdxeditor/editor"

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then(m => m.MDXEditor),
  { ssr: false }
)

export function MarkdownEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  // Debounce onChange untuk mengurangi lag
  const handleChange = useCallback((newValue: string) => {
    // Gunakan requestIdleCallback untuk performa lebih baik
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        onChange(newValue)
      })
    } else {
      // Fallback dengan setTimeout
      setTimeout(() => {
        onChange(newValue)
      }, 0)
    }
  }, [onChange])

  // Image upload handler for imagePlugin: intercept local uploads
  const handleUploadImage = async (file: File) => {
    // Show notification in English: cannot upload from local, please use image URL.
    if (typeof window !== "undefined") {
      window.alert("Currently, uploading images from local is disabled. Please use an image URL.");
    }
    // Reject upload by returning null
    return null;
  };

  // Memoize plugins agar tidak re-create setiap render
  const plugins = useMemo(() => [
    // Core plugins
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    linkPlugin(),
    linkDialogPlugin(),

    // Advanced plugins
    tablePlugin(),
    thematicBreakPlugin(),

    // Image plugin
    imagePlugin({
      disableImageResize: false ,
    }),

    // Source view plugin
    diffSourcePlugin({
      viewMode: 'rich-text'
    }),

    // Shortcuts
    markdownShortcutPlugin(),

    // Toolbar dengan komponen terpilih
    toolbarPlugin({
      toolbarContents: () => (
        <DiffSourceToggleWrapper>
          <ConditionalContents
            options={[
              {
                fallback: () => (
                  <>
                    {/* Undo/Redo */}
                    <UndoRedo />
                    <Separator />

                    {/* Block Type */}
                    <BlockTypeSelect />
                    <Separator />

                    {/* Text Formatting */}
                    <BoldItalicUnderlineToggles />
                    <Separator />

                    {/* Lists */}
                    <ListsToggle />
                    <Separator />

                    {/* Insert Elements */}
                    <CreateLink />
                    <InsertImage />
                    <InsertTable />
                    <InsertThematicBreak />
                  </>
                )
              }
            ]}
          />
        </DiffSourceToggleWrapper>
      )
    })
  ], [])

  return (
    <div className="relative group">
      {/* Gradient Border Container */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Main Editor Container */}
      <div className="relative bg-white rounded-2xl border border-cyan-100 shadow-lg overflow-hidden">
        {/* Custom Header */}
        <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50 border-b border-cyan-100 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Decorative Dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-blue-400 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-sm" />
            </div>

            {/* Title */}
            <div className="flex-1 flex items-center gap-2 ml-2">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Rich Text Editor
              </span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur rounded-lg border border-cyan-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-600">Ready</span>
            </div>
          </div>
        </div>

        {/* Editor Wrapper */}
        <div className="futuristic-markdown-editor">
          <MDXEditor
            markdown={value}
            onChange={handleChange}
            plugins={plugins}
            contentEditableClassName="mdx-editor-content min-h-[500px]"
          />
          <div>

          </div>
        </div>
      </div>

      {/* Custom Styles - Hati-hati dengan selector agar tidak override default behavior */}
      <style jsx global>{`

.mdx-editor-content h1 {
  font-size: 2.25rem !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin: 1.5rem 0 !important;
}

.mdx-editor-content h2 {
  font-size: 1.875rem !important;
  font-weight: 600 !important;
  margin: 1.25rem 0 !important;
}

.mdx-editor-content h3 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin: 1rem 0 !important;
}

.mdx-editor-content h4 {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  margin: 0.875rem 0 !important;
}

.mdx-editor-content h5 {
  font-size: 1.125rem !important;
  font-weight: 500 !important;
  margin: 0.75rem 0 !important;
}

.mdx-editor-content h6 {
  font-size: 1rem !important;
  font-weight: 500 !important;
  margin: 0.625rem 0 !important;
}



        /* =========================
           TOOLBAR STYLING
           ========================= */
        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 {
          background: linear-gradient(to right, #ecfeff, #dbeafe, #ecfeff) !important;
          border-bottom: 1px solid #a5f3fc !important;
          padding: 0.75rem 1rem !important;
        }

        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 button {
          color: #0e7490 !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 0.75rem !important;
          transition: all 0.2s !important;
          border: 1px solid transparent !important;
          background: white !important;
          font-weight: 500 !important;
        }

        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 button:hover {
          background: linear-gradient(to right, #cffafe, #dbeafe) !important;
          border-color: #67e8f9 !important;
          color: #0c4a6e !important;
          transform: translateY(-1px) !important;
        }

        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 button[data-active="true"],
        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 button[aria-pressed="true"] {
          background: linear-gradient(to right, #06b6d4, #3b82f6) !important;
          color: white !important;
          border-color: #0891b2 !important;
        }

        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 select {
          border: 1px solid #a5f3fc !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 2rem 0.5rem 0.75rem !important;
          background: white !important;
          color: #0e7490 !important;
          font-weight: 500 !important;
        }

        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 select:hover,
        .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 select:focus {
          border-color: #06b6d4 !important;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1) !important;
        }

        /* =========================
           CONTENT AREA STYLING
           ========================= */
        .futuristic-markdown-editor ._contentEditable_uaoq8_158 {
          padding: 1.5rem !important;
          background: white !important;
          color: #334155 !important;
          line-height: 1.75 !important;
        }

      
        /* =========================
           LINKS
           ========================= */
        .futuristic-markdown-editor a {
          color: #0891b2 !important;
          text-decoration: underline !important;
          text-decoration-color: #67e8f9 !important;
          transition: all 0.2s !important;
        }

        .futuristic-markdown-editor a:hover {
          color: #0e7490 !important;
          text-decoration-color: #06b6d4 !important;
        }

        /* =========================
           BLOCKQUOTES
           ========================= */
        .futuristic-markdown-editor blockquote {
          border-left: 4px solid #06b6d4 !important;
          background: linear-gradient(to right, #ecfeff, transparent) !important;
          padding: 1rem 1.5rem !important;
          border-radius: 0 0.5rem 0.5rem 0 !important;
          color: #334155 !important;
          font-style: italic !important;
          margin: 1.5rem 0 !important;
        }

        /* =========================
           LISTS - PENTING: Jangan override display dan list-style
           ========================= */
        .futuristic-markdown-editor ul,
        .futuristic-markdown-editor ol {
          color: #475569 !important;
          padding-left: 2rem !important;
          margin: 1rem 0 !important;
          /* JANGAN set list-style: none atau display: block */
        }

        .futuristic-markdown-editor ul {
          list-style-type: disc !important;
        }

        .futuristic-markdown-editor ol {
          list-style-type: decimal !important;
        }

        .futuristic-markdown-editor li {
          margin: 0.5rem 0 !important;
          display: list-item !important;
          /* PENTING: Biarkan display: list-item agar bullet/number muncul */
        }

        .futuristic-markdown-editor li::marker {
          color: #06b6d4 !important;
          font-weight: 600 !important;
        }

        /* Nested lists */
        .futuristic-markdown-editor ul ul,
        .futuristic-markdown-editor ol ul {
          list-style-type: circle !important;
        }

        .futuristic-markdown-editor ul ul ul,
        .futuristic-markdown-editor ol ul ul {
          list-style-type: square !important;
        }

  

        /* =========================
           CODE (Inline only)
           ========================= */
        .futuristic-markdown-editor code {
          background: linear-gradient(to right, #ecfeff, #dbeafe) !important;
          color: #0e7490 !important;
          padding: 0.125rem 0.375rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875em !important;
          border: 1px solid #a5f3fc !important;
          font-family: 'Courier New', monospace !important;
        }

        /* =========================
           HORIZONTAL RULE
           ========================= */
        .futuristic-markdown-editor hr {
          border: none !important;
          height: 2px !important;
          background: linear-gradient(to right, transparent, #06b6d4, transparent) !important;
          margin: 2rem 0 !important;
        }

        /* =========================
           SELECTION
           ========================= */
        .futuristic-markdown-editor ::selection {
          background: #a5f3fc !important;
          color: #0c4a6e !important;
        }

        /* =========================
           DIALOGS
           ========================= */
        .futuristic-markdown-editor ._dialogRoot_1gx10_5 {
          background: white !important;
          border-radius: 1rem !important;
          border: 2px solid #a5f3fc !important;
          box-shadow: 0 10px 40px rgba(6, 182, 212, 0.2) !important;
        }

        /* =========================
           PERFORMANCE
           ========================= */
        .futuristic-markdown-editor [contenteditable].typing * {
          transition: none !important;
          animation: none !important;
        }

        /* =========================
           RESPONSIVE
           ========================= */
        @media (max-width: 768px) {
          .futuristic-markdown-editor ._toolbarRoot_uaoq8_34 {
            padding: 0.5rem !important;
          }
          
          .futuristic-markdown-editor ._contentEditable_uaoq8_158 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}