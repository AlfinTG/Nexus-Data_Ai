"use client";

import { jsPDF } from "jspdf";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  projectId: number;
  messages: Message[];
};

export default function ExportPDF({
  projectId,
  messages,
}: Props) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Nexus EPC AI Chat Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Project ID: ${projectId}`, 20, 35);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      45
    );

    let y = 60;

    messages.forEach((msg) => {
      const title =
        msg.role === "user"
          ? "User:"
          : "AI:";

      doc.setFont("helvetica", "bold");
      doc.text(title, 20, y);

      doc.setFont("helvetica", "normal");

      const lines = doc.splitTextToSize(
        msg.content,
        170
      );

      doc.text(lines, 20, y + 8);

      y += lines.length * 8 + 15;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`project-${projectId}-chat.pdf`);
  };

  return (
    <button
      onClick={exportPDF}
      className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
    >
      📄 Export PDF
    </button>
  );
}
