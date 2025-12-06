import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { twMerge } from "tailwind-merge";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className={twMerge("prose max-w-none", className)}>
      <ReactMarkdown
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: [
                  "ml-2 text-gray-400 hover:text-blue-500 transition-colors",
                ],
                ariaHidden: true,
              },
              content: () => ({
                type: "element",
                tagName: "span",
                properties: { className: ["text-xl"] },
                children: [{ type: "text" }],
              }),
            },
          ],
        ]}
        components={{
          h1: ({ ...props }) => (
            <h1
              id={props.id}
              className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              id={props.id}
              className="text-2xl font-semibold mt-8 mb-3 pt-2"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              id={props.id}
              className="text-xl font-medium mt-6 mb-2"
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <a
              {...props}
              className="hover:underline"
              target={props.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                props.href?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
