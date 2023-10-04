import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

export default function Card({
  title,
  description,
  demo,
  large,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col col-span-1 h-64 p-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      
      <div className="mx-auto max-w-md text-center animate-fade-up">
        <h2 className="bg-gradient-to-br from-black to-stone-400 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
          {title}
        </h2>
        <div className="mt-3 mb-4 text-center text-gray-800 opacity-70 md:text-m [text-wrap:balance]">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                  className="font-medium text-gray-800 underline transition-colors"
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                  inline="true"
                  className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
      <div className="flex h-60 items-center justify-center">{demo}</div>
    </div>
  );
}
