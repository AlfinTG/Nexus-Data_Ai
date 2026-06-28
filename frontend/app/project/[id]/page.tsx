"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getProjectDocuments,
  uploadFile,
  getDocument,
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

export default function ProjectPage({ params }: Props) {
  const { id } = use(params);

  return <ProjectDetails projectId={Number(id)} />;
}

function ProjectDetails({ projectId }: { projectId: number }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      const response = await getProjectDocuments(projectId);

      console.log("Documents:", response.data);

      setDocuments(response.data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [projectId]);

  // Upload PDF
  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please choose a PDF.");
      return;
    }

    try {
      setUploading(true);

      setSuccessMessage("");
      setErrorMessage("");

      await uploadFile(projectId, selectedFile);

      setSuccessMessage("PDF uploaded successfully!");

      setSelectedFile(null);

      await fetchDocuments();
    } catch (error) {
      console.error(error);

      setErrorMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleView = async (documentId: number) => {
  try {
    const response = await getDocument(documentId);

    console.log(response.data);

    // We'll improve this in the next step
    alert("Document fetched successfully.");
  } catch (error) {
    console.error(error);
    alert("Unable to fetch document.");
  }
};

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <Link
        href="/dashboard"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Project Details
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Top Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
            <p className="text-gray-600">
              Project ID
            </p>

            <h2 className="text-4xl font-bold">
              {projectId}
            </h2>
          </div>

          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <p className="text-gray-600">
              Total Documents
            </p>

            <h2 className="text-4xl font-bold">
              {documents.length}
            </h2>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
            <p className="text-gray-600">
              Status
            </p>

            <h2 className="text-3xl font-bold">
              Active
            </h2>
          </div>

        </div>

        {/* Messages */}

        {successMessage && (
          <p className="mb-5 text-green-600 font-semibold">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="mb-5 text-red-600 font-semibold">
            {errorMessage}
          </p>
        )}

        {/* Documents */}

        <h2 className="text-2xl font-bold mb-5">
          Uploaded Documents
        </h2>

        {loading ? (
          <p>Loading documents...</p>
        ) : documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          <div className="space-y-4">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="flex justify-between items-center bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
              >

                <div>

                  <h3 className="text-xl font-semibold">
                    📄 {doc.filename}
                  </h3>

                  <p className="text-gray-500">
                    Document ID: {doc.id}
                  </p>

                </div>

               <button
  onClick={() => handleView(doc.id)}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
  View
</button>

              </div>

            ))}

          </div>
        )}

        {/* Upload */}

        <h2 className="text-2xl font-bold mt-10 mb-5">
          Upload New PDF
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-8">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          {selectedFile && (

            <div className="mt-5 bg-white rounded-xl shadow p-5">

              <p className="font-semibold text-lg">
                📄 {selectedFile.name}
              </p>

              <p className="text-gray-500">
                Ready to upload
              </p>

            </div>

          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>

        </div>

      </div>

    </main>
  );
}