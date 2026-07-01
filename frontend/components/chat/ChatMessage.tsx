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
    className={`flex gap-3 ${
      isUser ? "justify-end" : "justify-start"
    }`}
  >
    {!isUser && (
      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <Bot size={20} />
      </div>
    )}

    <div
      className={`max-w-2xl rounded-2xl px-5 py-4 shadow ${
        isUser
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <p>{content}</p>

      <p className="mt-2 text-xs opacity-70">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>

    {isUser && (
      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
        <User size={20} />
      </div>
    )}
  </div>
);
}