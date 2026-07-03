"use client";

import ThemeToggle from "@/components/theme/ThemeToggle";
import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  FileText,
  Upload,
} from "lucide-react";

import {
  getProjectDocuments,
  uploadFile,
} from "@/lib/api";

type Document = {
  id: number;
  filename: string;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProjectPage({
  params,
}: Props) {
  const { id } = use(params);

  return (
    <ProjectDetails
      projectId={Number(id)}
    />
  );
}

function ProjectDetails({
  projectId,
}: {
  projectId: number;
}) {
  const [documents, setDocuments] =
    useState<Document[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const fetchDocuments = async () => {
    try {
      const response =
        await getProjectDocuments(projectId);

      setDocuments(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [projectId]);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error(
        "Please choose a PDF."
      );
      return;
    }

    try {
      setUploading(true);

      await uploadFile(
        projectId,
        selectedFile
      );

      toast.success(
        "PDF uploaded successfully!"
      );

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchDocuments();
    } catch (error) {
      console.error(error);

      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-black">

  <div className="mx-auto max-w-7xl p-10">

    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Dashboard
    </Link>

    <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

      <div>

        <p className="text-blue-600 font-semibold">
          Engineering Workspace
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-900 dark:text-white">
          Project #{projectId}
        </h1>

        <p className="mt-3 text-lg text-gray-500 dark:text-slate-400">
          Manage engineering documents and AI knowledge.
        </p>

      </div>

      <div className="flex items-center gap-4">

  <ThemeToggle />

  <div className="rounded-full bg-green-100 px-6 py-3 font-semibold text-green-700">
    🟢 AI Ready
  </div>

</div>

    </div>

      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-900">

        <div className="mt-12 grid gap-6 md:grid-cols-3">

  <div className="rounded-2xl bg-white p-8 shadow-lg transition-colors dark:bg-slate-800">

    <p className="text-gray-500">
      Project ID
    </p>

    <h2 className="mt-4 text-5xl font-bold text-blue-600">
      #{projectId}
    </h2>

  </div>

  <div className="rounded-2xl bg-white p-8 shadow-lg">

    <p className="text-gray-500 dark:text-slate-400">
      Documents
    </p>

    <h2 className="mt-4 text-5xl font-bold text-green-600">
      {documents.length}
    </h2>

  </div>

  <div className="rounded-2xl bg-white p-8 shadow-lg">

    <p className="text-gray-500">
      Status
    </p>

    <h2 className="mt-4 text-4xl font-bold text-purple-600">
      Active
    </h2>

  </div>


        </div>

        <div className="mt-12 mb-6 flex items-center justify-between">

  <div>

    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
      Project Documents
    </h2>

    <p className="mt-2 text-gray-500 dark:text-slate-400">
      Browse uploaded engineering files.
    </p>

  </div>

  <div className="rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-semibold">

    {documents.length} Files

  </div>

</div>

        {loading ? (
          <div className="flex justify-center py-12">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          </div>

        ) : documents.length === 0 ? (

          <div className="rounded-3xl bg-white py-24 text-center shadow-lg dark:bg-slate-800">

            <div className="flex justify-center">

              <FileText className="h-24 w-24 text-gray-300" />

            </div>

            <h2 className="mt-4 text-2xl font-bold dark:text-white">

              No Engineering Documents

            </h2>

            <p className="mt-2 text-gray-500 dark:text-slate-400">

              Upload specifications, manuals, drawings or reports to begin using AI search.

            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {documents.map((doc) => (

              <div
  key={doc.id}
  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
>

               <div className="flex items-center gap-5">

  <div className="rounded-xl bg-blue-100 p-4">

    <FileText className="h-8 w-8 text-blue-600" />

  </div>

  <div>

    <h3 className="text-xl font-bold text-slate-900 dark:text-white">

      {doc.filename}

    </h3>

    <p className="mt-1 text-gray-500 dark:text-slate-400">

      Document #{doc.id}

    </p>

    <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

      Processed

    </span>

  </div>

</div>
                <Link
                  href={`/document/${doc.id}`}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  View
                </Link>

              </div>

            ))}

          </div>

        )}

        {/* ================= AI Assistant ================= */}

<div className="mt-12 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white shadow-xl">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <p className="text-green-100 font-semibold">
        AI Engineering Assistant
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        Ask Questions About Your Documents
      </h2>

      <p className="mt-4 max-w-2xl text-green-100">
        Use Retrieval-Augmented Generation (RAG) to ask engineering questions
        about uploaded EPC specifications, reports and technical documents.
      </p>

    </div>

    <Link href={`/chat/${projectId}`}>

      <button className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-green-700 transition hover:scale-105 hover:bg-gray-100">

        🤖 Open AI Chat

      </button>

    </Link>

  </div>

</div>

                <h2 className="mt-12 text-3xl font-bold text-slate-900 dark:text-white">
  Upload Engineering Documents
</h2>

<p className="mt-2 mb-8 text-gray-500 dark:text-slate-400">
  Upload PDF specifications, drawings, reports and manuals.
</p>

        <div className="mt-8 rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-white p-10 shadow-lg transition duration-300 hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">

  <div className="flex flex-col items-center justify-center">

    <Upload className="h-16 w-16 text-blue-600" />

    <h3 className="mt-6 text-2xl font-bold">
      Drag & Drop PDF Here
    </h3>

    <p className="mt-3 text-gray-500 dark:text-slate-400">
      or click below to browse your files
    </p>

  </div>

  <input
    ref={fileInputRef}
    type="file"
    accept=".pdf"
    onChange={(e) => {
      if (e.target.files) {
        setSelectedFile(e.target.files[0]);
      }
    }}
    className="mt-8 block w-full rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
  />

  {selectedFile && (

    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-800">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-blue-100 p-3">

          <FileText className="h-8 w-8 text-blue-600" />

        </div>

        <div>

          <h3 className="font-semibold dark:text-white">

            {selectedFile.name}

          </h3>

          <p className="text-gray-500">
            Ready for upload
          </p>

        </div>

      </div>

    </div>

  )}

  <button
    onClick={handleUpload}
    disabled={uploading}
    className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
  >

    <Upload className="h-6 w-6" />

    {uploading ? "Uploading..." : "Upload PDF"}

  </button>

</div>

        </div>

      </div>

    </main>
  );
}