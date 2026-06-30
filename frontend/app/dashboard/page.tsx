"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FolderOpen, Plus } from "lucide-react";
import { getProjects, createProject } from "@/lib/api";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name.");
      return;
    }

    try {
      setCreating(true);

      await createProject(projectName);

      toast.success("Project created successfully!");

      setProjectName("");
      setShowModal(false);

      await fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        EPC Intelligence Platform
      </h1>

      <h2 className="text-2xl font-semibold mb-6">
        Projects
      </h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : projects.length === 0 ? (

        <div className="text-center py-20">

          <div className="flex justify-center">
            <FolderOpen className="w-20 h-20 text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            No Projects Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first project.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {projects.map((project) => (

            <Link
              key={project.id}
              href={`/project/${project.id}`}
            >
              <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer">

                <h3 className="text-xl font-semibold">
                  {project.name}
                </h3>

                <p className="text-gray-500">
                  Project ID: {project.id}
                </p>

                {project.description && (
                  <p className="mt-2 text-gray-600">
                    {project.description}
                  </p>
                )}

              </div>

            </Link>

          ))}

        </div>

      )}

      <button
        onClick={() => setShowModal(true)}
        className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        New Project
      </button>

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl shadow-lg p-6 w-96">

            <h2 className="text-2xl font-bold mb-5">
              Create New Project
            </h2>

            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full border rounded-lg p-3 mb-5"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateProject}
                disabled={creating}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {creating ? "Creating..." : "Create"}
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}