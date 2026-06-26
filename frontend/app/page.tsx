"use client";
import { createProject } from "@/lib/api";
import { useState } from "react";

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState<number | null>(null);
 const handleCreateProject = async () => {
  try {
    const response = await createProject(projectName);

    console.log(response.data);

    setProjectId(response.data.id);

    alert("Project created successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to create project.");
  }
};
  return (
    <main>
      <h1>EPC Intelligence Platform</h1>

      <label>Project Name</label>

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
     {projectId && <p>Project ID: {projectId}</p>}
    </main>
  );
}