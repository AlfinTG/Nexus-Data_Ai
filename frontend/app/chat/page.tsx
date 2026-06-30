"use client";

import { useState } from "react";

import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hello! I'm your EPC AI Assistant. Ask me anything about your project documents.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = (message: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    // Fake AI response after 1 second
    setTyping(true);
    setLoading(true);
    setTimeout(() => {
      setTyping(false);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a dummy AI response. Later this will come from your FastAPI backend.",
        },
      ]);
    }, 1000);
  };

  return (
    <main className="flex h-screen bg-gray-100">

      <ChatSidebar />

      <section className="flex flex-1 flex-col">

        <ChatHeader />

        <>
  <ChatWindow
  messages={messages}
  setInput={setInput}
/>

<ChatInput
  input={input}
  setInput={setInput}
  onSend={handleSend}
  loading={loading}
/>

  {typing && <TypingIndicator />}
</>

       <ChatInput
    input={input}
    setInput={setInput}
    onSend={handleSend}
    loading={loading}
/>

      </section>

    </main>
  );
}