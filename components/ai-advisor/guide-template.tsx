import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export default function GuideTemplate({
  index,
  title,
  reference,
}: {
  index: number;
  title: string;
  reference: string;
}) {
  return (
    <>
      <h1 className="mx-auto max-w-3xl font-display text-4xl text-center font-bold tracking-normal animate-fade-up drop-shadow-sm md:text-4xl md:leading-[3rem]">
        <span className="relative text-blue-600">
          <span className="relative">{title}</span>
        </span>{" "}
      </h1>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-semibold py-5"
            />
          ),
          h2: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-2xl font-semibold py-4"
            />
          ),
        }}
        remarkPlugins={[remarkGfm]}
      >
        {reference}
      </ReactMarkdown>
    </>
  );
}