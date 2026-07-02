"use client";

export default function TypingIndicator() {
  return (
    <div className="px-8 py-4">

      <div className="mx-auto max-w-5xl">

        <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-lg transition-colors dark:border-slate-700 dark:bg-slate-800">

          <div className="flex gap-2">

            <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500"></div>

            <div
              className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "0.2s" }}
            ></div>

            <div
              className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "0.4s" }}
            ></div>

          </div>

          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            EPC AI is thinking...
          </span>

        </div>

      </div>

    </div>
  );
}