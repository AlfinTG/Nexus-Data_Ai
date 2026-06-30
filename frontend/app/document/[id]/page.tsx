"use client";

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
      <main className="min-h-screen p-10">
        Loading document...
      </main>
    );
  }

  if (!document) {
    return (
      <main className="min-h-screen p-10">
        Document not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <Link
        href={`/project/${document.project_id}`}
        className="text-blue-600 hover:underline"
      >
        ← Back to Project
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-8">
        {document.filename}
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <p>
          <strong>Document ID:</strong> {document.id}
        </p>

        <p>
          <strong>Status:</strong> {document.status}
        </p>

        <p>
          <strong>Project:</strong> {document.project_id}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Extracted Text
        </h2>

        <div className="bg-gray-50 border rounded-xl p-6 h-[500px] overflow-y-scroll whitespace-pre-wrap">
          {document.text}
        </div>

      </div>

    </main>
  );
}