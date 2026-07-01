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
    <div className="border-t bg-white p-6">

      <div className="mx-auto flex max-w-4xl gap-3">

        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Send className="w-5 h-5" />

          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

    </div>
  );
}