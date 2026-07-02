"use client";

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
    <main className="min-h-screen bg-gray-100 p-10">

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Project Details
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-50 rounded-xl p-6">

            <p className="text-gray-600">
              Project ID
            </p>

            <h2 className="text-4xl font-bold">
              {projectId}
            </h2>

          </div>

          <div className="bg-green-50 rounded-xl p-6">

            <p className="text-gray-600">
              Total Documents
            </p>

            <h2 className="text-4xl font-bold">
              {documents.length}
            </h2>

          </div>

          <div className="bg-yellow-50 rounded-xl p-6">

            <p className="text-gray-600">
              Status
            </p>

            <h2 className="text-3xl font-bold">
              Active
            </h2>

          </div>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Uploaded Documents
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          </div>

        ) : documents.length === 0 ? (

          <div className="text-center py-20">

            <div className="flex justify-center">

              <FileText className="w-20 h-20 text-gray-400" />

            </div>

            <h2 className="text-2xl font-bold mt-4">

              No Documents

            </h2>

            <p className="text-gray-500 mt-2">

              Upload your first PDF.

            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="flex justify-between items-center bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
              >

                <div>

                  <h3 className="flex items-center gap-2 text-xl font-semibold">

                    <FileText className="w-6 h-6 text-blue-600" />

                    {doc.filename}

                  </h3>

                  <p className="text-gray-500">

                    Document ID: {doc.id}

                  </p>

                </div>

                <Link
                  href={`/document/${doc.id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  View
                </Link>

              </div>

            ))}

          </div>

        )}

        <Link href={`/chat/${projectId}`}>
  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
    💬 Open AI Chat
  </button>
</Link>

                <h2 className="text-2xl font-bold mt-10 mb-5">
          Upload New PDF
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-8">

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFile(e.target.files[0]);
              }
            }}
            className="block w-full"
          />

          {selectedFile && (
            <div className="mt-5 bg-white rounded-xl shadow p-5">

              <p className="flex items-center gap-2 font-semibold text-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                {selectedFile.name}
              </p>

              <p className="text-gray-500">
                Ready to upload
              </p>

            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            <Upload className="w-5 h-5" />

            {uploading ? "Uploading..." : "Upload PDF"}
          </button>

        </div>

      </div>

    </main>
  );
}