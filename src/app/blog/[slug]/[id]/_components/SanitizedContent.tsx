"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

type Props = {
  content: string;
  className?: string;
};

const SanitizedContent = ({ content, className }: Props) => {
  // Custom components untuk styling yang sama dengan editor
  const components: Components = {
    // Headings - responsive font sizes
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight my-4 md:my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold my-3 md:my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold my-3 md:my-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base sm:text-lg md:text-xl font-semibold my-2.5 md:my-3.5">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base sm:text-lg font-medium my-2 md:my-3">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm sm:text-base font-medium my-2 md:my-2.5">{children}</h6>
    ),

    // Paragraphs - responsive spacing
    p: ({ children }) => (
      <p className="my-3 md:my-4 leading-relaxed text-sm sm:text-base">{children}</p>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-cyan-600 underline decoration-cyan-200 hover:text-cyan-700 hover:decoration-cyan-400 transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // Images - styling yang sama dengan editor
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ''}
        className="max-w-full h-auto rounded-lg border-2 border-cyan-200 shadow-lg my-4 transition-all hover:border-cyan-400 hover:shadow-xl hover:-translate-y-0.5"
      />
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc pl-8 my-4 text-slate-600 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 my-4 text-slate-600 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="my-2 marker:text-cyan-500 marker:font-semibold">
        {children}
      </li>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-50 to-transparent pl-6 pr-4 py-4 my-6 rounded-r-lg italic text-slate-700">
        {children}
      </blockquote>
    ),

    // Code (inline) - responsive
    code: ({ children, className }) => {
      const isCodeBlock = className?.includes('language-');
      
      if (isCodeBlock) {
        return (
          <code className={`${className} block bg-gradient-to-r from-slate-900 to-slate-800 text-cyan-300 p-3 sm:p-4 rounded-lg overflow-x-auto font-mono text-xs sm:text-sm`}>
            {children}
          </code>
        );
      }
      
      return (
        <code className="bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 px-1 sm:px-1.5 py-0.5 rounded border border-cyan-200 font-mono text-xs sm:text-sm">
          {children}
        </code>
      );
    },

    // Pre (code block wrapper)
    pre: ({ children }) => (
      <pre className="my-3 md:my-4 rounded-lg overflow-hidden">
        {children}
      </pre>
    ),

    // Horizontal Rule
    hr: () => (
      <hr className="border-none h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-6 md:my-8" />
    ),

    // Table - responsive with horizontal scroll
    table: ({ children }) => (
      <div className="overflow-x-auto my-4 md:my-6 -mx-2 sm:mx-0">
        <table className="w-full border-collapse min-w-[500px] text-sm sm:text-base">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="border border-cyan-200 px-2 sm:px-3 py-1.5 sm:py-2 text-left font-semibold text-cyan-700 text-xs sm:text-sm">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-blue-100 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
        {children}
      </td>
    ),

    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),

    // Em (italic)
    em: ({ children }) => (
      <em className="italic text-slate-700">{children}</em>
    ),
  };

  return (
    <div className="relative group">
      {/* Preview Content - responsive padding */}
      <div className={`markdown-preview-content min-h-[300px] sm:min-h-[400px] md:min-h-[500px] p-4 sm:p-5 md:p-6 bg-white text-slate-700 leading-relaxed ${className || ''}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Selection Style */}
      <style jsx>{`
        .markdown-preview-content ::selection {
          background: #a5f3fc;
          color: #0c4a6e;
        }
      `}</style>
    </div>
  );
};

export default SanitizedContent;