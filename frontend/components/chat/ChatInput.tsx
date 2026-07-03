"use client";

import { Send } from "lucide-react";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: (message: string) => void;
  loading: boolean;
};

export default function ChatInput({
  input,
  setInput,
  onSend,
  loading,
}: Props) {

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t border-slate-200 bg-white/90 p-6 backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900">

      <div className="mx-auto flex max-w-5xl items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg transition-colors dark:border-slate-700 dark:bg-slate-800">

        <input
          type="text"
          value={input}
          disabled={loading}
          placeholder="Ask anything about your engineering documents..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 bg-transparent px-4 py-3 text-lg text-slate-900 outline-none placeholder:text-slate-400 disabled:bg-transparent dark:text-white dark:placeholder:text-slate-500"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />

          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

    </div>
  );
}