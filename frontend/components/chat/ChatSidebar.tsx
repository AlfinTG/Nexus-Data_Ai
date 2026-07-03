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
    <aside className="flex w-80 flex-col border-r border-slate-800 bg-slate-900 text-white">

  {/* Logo */}

  <div className="border-b border-slate-800 p-6">

    <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
      EPC Intelligence
    </p>

    <h1 className="mt-2 text-3xl font-bold">
      AI Assistant
    </h1>

    <p className="mt-2 text-sm text-slate-400">
      Engineering Knowledge Workspace
    </p>

  </div>

  {/* New Chat */}

  <div className="p-5">

    <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700">

      <MessageSquarePlus className="h-5 w-5" />

      New Conversation

    </button>

  </div>

  {/* Recent Chats */}

  <div className="flex-1 overflow-y-auto px-5">

    <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">

      Recent Conversations

    </h3>

    <div className="space-y-3">

      {chats.map((chat) => (

        <div
          key={chat.id}
          className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-800 p-4 transition hover:border-blue-500 hover:bg-slate-700"
        >

          <h4 className="font-semibold">
            {chat.title}
          </h4>

          <p className="mt-2 text-xs text-slate-400">
            {chat.date}
          </p>

        </div>

      ))}

    </div>

  </div>

  {/* Footer */}

  <div className="border-t border-slate-800 p-6">

    <p className="text-xs text-slate-500">
      EPC Intelligence Platform
    </p>

    <p className="mt-1 text-sm font-semibold">
      AI Engineering Assistant
    </p>

  </div>

</aside>
  );
}