"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
  projectId: number;
};

export default function ChatWindow({
  messages,
  setInput,
  projectId,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-white p-8 dark:from-slate-900 dark:via-slate-950 dark:to-black">

      <div className="mx-auto max-w-5xl space-y-8">

        {/* ================= Welcome Screen ================= */}

        {messages.length === 1 && (

          <div className="flex flex-col items-center py-20">

            <div className="rounded-full bg-blue-100 p-6 shadow-lg dark:bg-slate-800">

              <span className="text-6xl">
                🤖
              </span>

            </div>

            <p className="mt-3 text-xl font-semibold text-blue-600 dark:text-blue-400">
  Project #{projectId}
</p>

            <p className="mt-5 max-w-2xl text-center text-lg text-slate-500 dark:text-slate-400">
              Ask questions about engineering drawings,
              specifications, manuals, reports and technical
              documents using Retrieval-Augmented Generation (RAG).
            </p>

            <div className="mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-2">
                            <div
                onClick={() => setInput("Summarize this engineering document")}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400"
              >
                <h3 className="text-xl font-bold dark:text-white">
                  📄 Summarize Document
                </h3>

                <p className="mt-2 text-gray-500 dark:text-slate-400">
                  Generate a concise summary of the uploaded engineering document.
                </p>
              </div>

              <div
                onClick={() => setInput("Explain this engineering drawing")}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400"
              >
                <h3 className="text-xl font-bold dark:text-white">
                  ⚡ Explain Drawing
                </h3>

                <p className="mt-2 text-gray-500 dark:text-slate-400">
                  Understand diagrams, layouts and engineering drawings.
                </p>
              </div>

              <div
                onClick={() => setInput("List all equipment mentioned")}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400"
              >
                <h3 className="text-xl font-bold dark:text-white">
                  📊 List Equipment
                </h3>

                <p className="mt-2 text-gray-500 dark:text-slate-400">
                  Extract equipment names, systems and important assets.
                </p>
              </div>

              <div
                onClick={() => setInput("Find all technical specifications")}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400"
              >
                <h3 className="text-xl font-bold dark:text-white">
                  📐 Technical Specifications
                </h3>

                <p className="mt-2 text-gray-500 dark:text-slate-400">
                  Retrieve engineering specifications, ratings and dimensions.
                </p>
              </div>

            </div>

          </div>

        )}

        {/* ================= Chat Messages ================= */}

        {messages.length > 1 &&
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}