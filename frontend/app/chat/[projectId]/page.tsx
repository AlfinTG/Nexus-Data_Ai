"use client";

import { useState } from "react";

import { askAI } from "@/lib/api";

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
      content:
        "👋 Hello! I'm your EPC AI Assistant. Ask me anything about your project documents.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    try {
      setLoading(true);
      setTyping(true);

      // Replace 1 with dynamic projectId later
      const response = await askAI(1, message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to get AI response.",
        },
      ]);
    } finally {
      setTyping(false);
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <ChatSidebar />

      {/* Chat Area */}
      <section className="flex flex-1 flex-col">

        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <ChatWindow
          messages={messages}
          setInput={setInput}
        />

        {/* Typing Indicator */}
        {typing && <TypingIndicator />}

        {/* Input */}
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