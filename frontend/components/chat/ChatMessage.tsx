"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy, Check } from "lucide-react";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({
  role,
  content,
}: Props) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  
  const copyMessage = async () => {
  await navigator.clipboard.writeText(content);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <Bot size={20} />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-3xl rounded-2xl px-6 py-4 shadow-lg transition-colors ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        }`}
      >
        <div className="prose max-w-none whitespace-pre-wrap dark:prose-invert">
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ className, children, ...props }) {
      return (
        <pre className="my-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-green-300">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
  }}
>
  {content}
</ReactMarkdown>
</div>

{!isUser && (
  <button
    onClick={copyMessage}
    className="mt-4 flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
  >
    {copied ? (
      <>
        <Check className="h-4 w-4 text-green-500" />
        Copied
      </>
    ) : (
      <>
        <Copy className="h-4 w-4" />
        Copy
      </>
    )}
  </button>
)}

        <p className="mt-3 text-xs opacity-70">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 text-white shadow-lg dark:bg-slate-600">
          <User size={20} />
        </div>
      )}
    </div>
  );
}