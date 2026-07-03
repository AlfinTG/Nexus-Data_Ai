"use client";

import { Bot, User } from "lucide-react";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({
  role,
  content,
}: Props) {
  const isUser = role === "user";

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
        <p className="whitespace-pre-wrap leading-7">
          {content}
        </p>

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