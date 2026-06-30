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
};

export default function ChatWindow({
  messages,
  setInput,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Welcome Screen */}
        {messages.length === 1 && (
          <div className="flex flex-col items-center justify-center py-16">

            <div className="text-6xl mb-6">
              🤖
            </div>

            <h1 className="text-4xl font-bold">
              EPC AI Assistant
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              Ask anything about your EPC documents.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">

              <div
                onClick={() => setInput("Summarize this document")}
                className="cursor-pointer rounded-xl border bg-white p-5 shadow hover:shadow-md transition"
              >
                📄 Summarize this document
              </div>

              <div
                onClick={() => setInput("Explain this drawing")}
                className="cursor-pointer rounded-xl border bg-white p-5 shadow hover:shadow-md transition"
              >
                ⚡ Explain this drawing
              </div>

              <div
                onClick={() => setInput("List all equipment")}
                className="cursor-pointer rounded-xl border bg-white p-5 shadow hover:shadow-md transition"
              >
                📊 List all equipment
              </div>

              <div
                onClick={() => setInput("Find technical specifications")}
                className="cursor-pointer rounded-xl border bg-white p-5 shadow hover:shadow-md transition"
              >
                📐 Find technical specifications
              </div>

            </div>

          </div>
        )}

        {/* Chat Messages */}
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