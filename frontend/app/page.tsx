"use client";

import { useState } from "react";
import { createProject, uploadFile } from "@/lib/api";

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Create Project
  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      alert("Please enter a project name.");
      return;
    }

    try {
      const response = await createProject(projectName);

      console.log("Project Response:", response.data);

      setProjectId(response.data.id);

      setSuccessMessage("Project created successfully!");
      setErrorMessage("");
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Failed to create project.");
      setSuccessMessage("");
    }
  };

  // Upload PDF
  const handleUpload = async () => {
    if (!projectId) {
      alert("Please create a project first.");
      return;
    }

    if (!selectedFile) {
      alert("Please choose a PDF file.");
      return;
    }

    try {
      setIsUploading(true);

      const response = await uploadFile(projectId, selectedFile);

      console.log("Upload Response:", response.data);

      setSuccessMessage("PDF uploaded successfully!");
      setErrorMessage("");
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Upload failed.");
      setSuccessMessage("");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>EPC Intelligence Platform</h1>

      {successMessage && (
  <p style={{ color: "green", fontWeight: "bold" }}>
    {successMessage}
  </p>
)}

{errorMessage && (
  <p style={{ color: "red", fontWeight: "bold" }}>
    {errorMessage}
  </p>
)}
      <label>Project Name</label>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreateProject}>
        Create Project
      </button>

      <br />
      <br />

      {projectId && (
        <p>
          <strong>Project ID:</strong> {projectId}
        </p>
      )}

      <h3>Choose PDF</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setSelectedFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      {selectedFile && (
        <p>
          <strong>Selected File:</strong> {selectedFile.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>
    </main>
  );
}