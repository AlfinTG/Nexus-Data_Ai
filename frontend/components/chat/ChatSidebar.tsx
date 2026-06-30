"use client";

import { MessageSquarePlus } from "lucide-react";

const chats = [
  {
    id: 1,
    title: "Tender Analysis",
    date: "Today",
  },
  {
    id: 2,
    title: "Pipeline Project",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Electrical Layout",
    date: "Last Week",
  },
];

export default function ChatSidebar() {
  return (
    <aside className="w-72 bg-gray-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">
          EPC AI
        </h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 hover:bg-blue-700 transition">
          <MessageSquarePlus className="w-5 h-5" />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3">

        <div className="rounded-lg bg-gray-800 p-3 cursor-pointer hover:bg-gray-700">
          <div className="mt-6">

  <h3 className="mb-3 text-sm uppercase text-gray-400">
    Recent Chats
  </h3>

  <div className="space-y-2">

    {chats.map((chat) => (

      <div
        key={chat.id}
        className="cursor-pointer rounded-lg bg-gray-800 p-3 hover:bg-gray-700 transition"
      >

        <h4 className="font-medium">
          {chat.title}
        </h4>

        <p className="text-xs text-gray-400">
          {chat.date}
        </p>

      </div>

    ))}

  </div>

</div>
        </div>

        <div className="rounded-lg bg-gray-800 p-3 cursor-pointer hover:bg-gray-700">
          <div className="mt-6">

  <h3 className="mb-3 text-sm uppercase text-gray-400">
    Recent Chats
  </h3>

  <div className="space-y-2">

    {chats.map((chat) => (

      <div
        key={chat.id}
        className="cursor-pointer rounded-lg bg-gray-800 p-3 hover:bg-gray-700 transition"
      >

        <h4 className="font-medium">
          {chat.title}
        </h4>

        <p className="text-xs text-gray-400">
          {chat.date}
        </p>

      </div>

    ))}

  </div>

</div>
        </div>

      </div>

    </aside>
  );
}