export default function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="rounded-2xl bg-white px-5 py-4 shadow">

        <div className="flex gap-2">

          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>

          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: "0.2s" }}
          ></div>

          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: "0.4s" }}
          ></div>

        </div>

      </div>

    </div>
  );
}