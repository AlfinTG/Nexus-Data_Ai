"use client";

import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";
import {
  Database,
  ArrowRight,
  FolderOpen,
  Sparkles,
  FileText,
  Bot,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <Database className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                EPC Intelligence
              </h1>

              <p className="text-xs text-gray-500">
                AI Powered Engineering Platform
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              href="/dashboard"
              className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              href="/chat"
              className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              AI Chat
            </Link>
          <ThemeToggle />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              Get Started

              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="mx-auto flex max-w-7xl flex-col items-center px-8 pt-40 pb-24 text-center">

        <div className="rounded-full bg-blue-100 px-6 py-2 text-blue-700 font-semibold">
          🚀 AI Powered Engineering Intelligence
        </div>

        <h1 className="mt-8 max-w-5xl text-6xl font-extrabold leading-tight text-gray-900">

          Transform Engineering Documents

          <span className="block text-blue-600">
            Into Intelligent Knowledge
          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-xl text-gray-600">

          Upload EPC engineering documents, organize projects,
          perform semantic search, and ask AI questions using
          Retrieval-Augmented Generation (RAG).

        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">

          <Link href="/dashboard">

            <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">

              <FolderOpen className="h-6 w-6" />

              Open Dashboard

            </button>

          </Link>

          <Link href="/chat">

            <button className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold transition hover:bg-gray-100">

              <Sparkles className="h-6 w-6" />

              AI Chat

            </button>

          </Link>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="mx-auto grid max-w-7xl gap-8 px-8 pb-24 md:grid-cols-3"
      >

        <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">

          <FolderOpen className="h-12 w-12 text-blue-600" />

          <h2 className="mt-6 text-2xl font-bold">
            Project Management
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Organize engineering projects,
            upload documents,
            and manage all EPC files
            in one centralized workspace.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">

          <FileText className="h-12 w-12 text-green-600" />

          <h2 className="mt-6 text-2xl font-bold">
            Smart PDF Processing
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Automatically extract,
            chunk,
            embed,
            and index engineering
            documents for AI retrieval.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">

          <Bot className="h-12 w-12 text-purple-600" />

          <h2 className="mt-6 text-2xl font-bold">
            AI Assistant
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Ask natural language questions
            about your engineering documents
            and receive accurate AI-powered answers.
          </p>

        </div>

      </section>
    {/* ================= STATS ================= */}

<section className="bg-white py-24">

  <div className="mx-auto max-w-7xl px-8">

    <div className="grid gap-8 md:grid-cols-4">

      <div className="rounded-2xl border bg-blue-50 p-8 text-center">

        <h2 className="text-5xl font-bold text-blue-600">
          500+
        </h2>

        <p className="mt-3 text-gray-600">
          Engineering Documents
        </p>

      </div>

      <div className="rounded-2xl border bg-green-50 p-8 text-center">

        <h2 className="text-5xl font-bold text-green-600">
          AI
        </h2>

        <p className="mt-3 text-gray-600">
          Semantic Search Ready
        </p>

      </div>

      <div className="rounded-2xl border bg-purple-50 p-8 text-center">

        <h2 className="text-5xl font-bold text-purple-600">
          24/7
        </h2>

        <p className="mt-3 text-gray-600">
          AI Assistance
        </p>

      </div>

      <div className="rounded-2xl border bg-orange-50 p-8 text-center">

        <h2 className="text-5xl font-bold text-orange-600">
          EPC
        </h2>

        <p className="mt-3 text-gray-600">
          Engineering Intelligence
        </p>

      </div>

    </div>

  </div>

</section>

{/* ================= HOW IT WORKS ================= */}

<section className="bg-slate-50 py-24">

  <div className="mx-auto max-w-7xl px-8">

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        How It Works
      </h2>

      <p className="mt-4 text-lg text-gray-600">
        Upload → Process → Search → Ask AI
      </p>

    </div>

    <div className="mt-20 grid gap-10 md:grid-cols-4">

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
          1
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Upload PDF
        </h3>

        <p className="mt-3 text-gray-600">
          Upload engineering drawings and EPC documents.
        </p>

      </div>

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
          2
        </div>

        <h3 className="mt-6 text-xl font-bold">
          AI Processing
        </h3>

        <p className="mt-3 text-gray-600">
          Documents are parsed, chunked and embedded automatically.
        </p>

      </div>

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-3xl text-white">
          3
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Semantic Search
        </h3>

        <p className="mt-3 text-gray-600">
          AI retrieves the most relevant engineering knowledge.
        </p>

      </div>

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-600 text-3xl text-white">
          4
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Get Answers
        </h3>

        <p className="mt-3 text-gray-600">
          Ask natural language questions and receive AI-powered answers.
        </p>

      </div>

    </div>

  </div>

</section>
          {/* ================= CALL TO ACTION ================= */}

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24">

        <div className="mx-auto max-w-5xl px-8 text-center text-white">

          <h2 className="text-5xl font-bold">
            Ready to Transform Your Engineering Workflow?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-blue-100">
            Start organizing your EPC projects, upload engineering documents,
            and let AI answer technical questions instantly.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">

            <Link href="/dashboard">

              <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition hover:scale-105">

                🚀 Open Dashboard

              </button>

            </Link>

            <Link href="/chat">

              <button className="rounded-xl border border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-700">

                🤖 Start AI Chat

              </button>

            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t bg-slate-900 text-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-10 md:flex-row">

          <div>

            <h2 className="text-2xl font-bold">
              EPC Intelligence Platform
            </h2>

            <p className="mt-2 text-gray-400">
              AI-Powered Engineering Document Intelligence
            </p>

          </div>

          <div className="flex gap-8 text-gray-400">

            <Link
              href="/dashboard"
              className="hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/chat"
              className="hover:text-white"
            >
              AI Chat
            </Link>

          </div>

        </div>

        <div className="border-t border-slate-800 py-6 text-center text-sm text-gray-500">

          © 2026 EPC Intelligence Platform • Built with Next.js, FastAPI & AI

        </div>

      </footer>
    </main>
  );
}