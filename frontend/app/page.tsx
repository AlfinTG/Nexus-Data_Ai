"use client";

import Link from "next/link";
import { FolderOpen, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <div className="max-w-7xl mx-auto px-8 py-24">

        {/* Hero */}

        <div className="text-center">

          <h1 className="text-6xl font-bold text-gray-900">
            EPC Intelligence Platform
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Upload EPC engineering documents, organize projects,
            and ask AI questions using Retrieval-Augmented Generation.
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-16 flex justify-center gap-6">

          <Link href="/dashboard">

            <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-white text-lg font-semibold hover:bg-blue-700 transition">

              <FolderOpen size={22} />

              Open Dashboard

            </button>

          </Link>

          <a href="#features">

            <button className="flex items-center gap-3 rounded-xl border px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition">

              <Sparkles size={22} />

              Learn More

            </button>

          </a>

        </div>

        {/* Features */}

        <section
          id="features"
          className="mt-32 grid md:grid-cols-3 gap-8"
        >

          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="text-5xl">
              📂
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Project Management
            </h2>

            <p className="mt-3 text-gray-600">
              Organize engineering projects and keep
              documents together.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="text-5xl">
              📄
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Smart PDF Processing
            </h2>

            <p className="mt-3 text-gray-600">
              Extract, chunk and index engineering
              documents automatically.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="text-5xl">
              🤖
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              AI Assistant
            </h2>

            <p className="mt-3 text-gray-600">
              Ask questions about uploaded documents
              using Retrieval-Augmented Generation.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}