"use client";

import ThemeToggle from "@/components/theme/ThemeToggle";
import { use } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDocument } from "@/lib/api";

type Document = {
  id: number;
  filename: string;
  text: string;
  status: string;
  project_id: number;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function DocumentPage({ params }: Props) {
  const { id } = use(params);

  return <DocumentViewer documentId={Number(id)} />;
}

function DocumentViewer({ documentId }: { documentId: number }) {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await getDocument(documentId);
        setDocument(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-black">

      <div className="text-center">

        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <p className="mt-6 text-lg text-gray-500 dark:text-slate-400">
          Loading document...
        </p>

      </div>

    </main>
  );
}

  if (!document) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">

      <div className="rounded-3xl bg-white p-12 text-center shadow-xl dark:bg-slate-800">

        <h1 className="text-3xl font-bold dark:text-white">
          Document Not Found
        </h1>

        <p className="mt-3 text-gray-500 dark:text-slate-400">
          The requested document does not exist.
        </p>

      </div>

    </main>
  );
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-black">

  <div className="mx-auto max-w-7xl p-10">

      <Link
  href={`/project/${document.project_id}`}
  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
>
  ← Back to Project
</Link>

      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

  <div>

    <p className="font-semibold text-blue-600">
      Engineering Document
    </p>

    <h1 className="mt-2 break-words text-5xl font-extrabold text-slate-900 dark:text-white">
      {document.filename}
    </h1>

    <p className="mt-3 text-gray-500 dark:text-slate-400">
      View extracted engineering content.
    </p>

  </div>

  <div className="flex items-center gap-4">

  <ThemeToggle />

  <span className="rounded-full bg-green-100 px-6 py-3 font-semibold text-green-700">
    ✅ {document.status}
  </span>

</div>

</div>

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900">

        <div className="grid gap-6 md:grid-cols-3">

  <div className="rounded-2xl bg-blue-50 p-6">

    <p className="text-gray-500 dark:text-slate-400">
      Document ID
    </p>

    <h2 className="mt-3 text-4xl font-bold text-blue-600">
  #{document.id}
</h2>

  </div>

  <div className="rounded-2xl bg-green-50 p-6">

    <p className="text-gray-500">
      Status
    </p>

    <h2 className="mt-3 capitalize text-3xl font-bold text-green-600">
  {document.status}
</h2>

  </div>

  <div className="rounded-2xl bg-purple-50 p-6">

    <p className="text-gray-500">
      Project
    </p>

    <h2 className="mt-3 text-4xl font-bold text-purple-600">
      #{document.project_id}
    </h2>

  </div>

</div>

        <div className="mt-10 mb-6 flex items-center justify-between">

  <div>

    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
      Extracted Text
    </h2>

    <p className="mt-2 text-gray-500 dark:text-slate-400">
      Parsed content extracted from the uploaded PDF.
    </p>

  </div>

  <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
    AI Indexed
  </span>

</div>

        <div className="h-[650px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-8 font-mono text-sm leading-7 shadow-inner whitespace-pre-wrap dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
          {document.text}
        </div>
      {/* ================= AI Assistant ================= */}

<div className="mt-10 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white shadow-xl">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <p className="text-green-100 font-semibold">
        AI Engineering Assistant
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Ask Questions About This Document
      </h2>

      <p className="mt-3 max-w-2xl text-green-100">
        Use Retrieval-Augmented Generation (RAG) to ask questions about the
        extracted content of this engineering document.
      </p>

    </div>

    <Link href={`/chat/${document.project_id}`}>

      <button className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-green-700 transition hover:scale-105 hover:bg-gray-100">

        🤖 Open AI Chat

      </button>

    </Link>

  </div>

</div>
      </div>
    </div>  
    </main>
  );
}