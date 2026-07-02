"use client";

import ThemeToggle from "@/components/theme/ThemeToggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
  projectId: number;
};

export default function ChatHeader({
  projectId,
}: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm dark:bg-slate-900 dark:border-slate-800">

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          EPC Intelligence Platform
        </p>

        <h2 className="mt-2 text-3xl font-bold dark:text-white">
          AI Assistant
        </h2>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Project #{projectId} • Engineering Knowledge Assistant
        </p>
      </div>

      <button
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
        className="rounded-xl border border-slate-300 bg-white p-3 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700 dark:text-white" />
        )}
      </button>

    </header>
  );
}