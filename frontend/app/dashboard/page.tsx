"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/api";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        EPC Intelligence Platform
      </h1>

      <h2 className="text-2xl font-semibold mb-6">
        Projects
      </h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
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

      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        + New Project
      </button>
    </main>
  );
}