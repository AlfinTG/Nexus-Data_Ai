"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FolderOpen, Plus } from "lucide-react";
import { getProjects, createProject } from "@/lib/api";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { motion } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";

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

    if (loading) {
  return (
    <main className="min-h-screen p-10 dark:bg-slate-950">
      <Skeleton className="mb-10 h-12 w-72" />

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>

      <Skeleton className="mb-8 h-14 w-full" />

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </main>
  );
}
  return(
  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-10 dark:from-slate-950 dark:via-slate-900 dark:to-black">

    {/* Header */}

    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <p className="text-blue-600 font-semibold">
          👋 Welcome Back
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-3 text-lg text-gray-500 dark:text-slate-400">
          Manage your EPC projects, engineering documents,
          and AI workspace from one place.
        </p>

      </div>

<div className="flex items-center gap-4">

  <ThemeToggle />

  <button
    onClick={() => setShowModal(true)}
    className="flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
  >
    <Plus className="h-5 w-5" />
    New Project
  </button>

</div>
</div>
    {/* Statistics */}

    <div className="mb-12 grid gap-6 md:grid-cols-3">

      <div className="rounded-2xl bg-white p-8 shadow-lg transition-colors dark:bg-slate-800">

        <h2 className="text-5xl font-bold text-blue-600">
          {projects.length}
        </h2>

        <p className="mt-3 text-gray-500 dark:text-slate-400">
          Total Projects
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow-lg transition-colors dark:bg-slate-800">

        <h2 className="text-5xl font-bold text-green-600">
          AI
        </h2>

        <p className="mt-3 text-gray-500 dark:text-slate-400">
          Semantic Search Ready
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow-lg transition-colors dark:bg-slate-800">

        <h2 className="text-5xl font-bold text-purple-600">
          EPC
        </h2>

        <p className="mt-3 text-gray-500 dark:text-slate-400">
          Engineering Intelligence
        </p>

      </div>

    </div>

    {/* Search */}

    <div className="mb-10">

      <input
        type="text"
        placeholder="🔍 Search Projects (Coming Soon)"
        disabled
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm outline-none disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
      />

    </div>
  ) : projects.length === 0 ? (

  <div className="rounded-3xl bg-white p-20 text-center shadow-lg dark:bg-slate-800">

    <div className="flex justify-center">

      <FolderOpen className="h-24 w-24 text-gray-300" />

    </div>

    <h2 className="mt-8 text-3xl font-bold dark:text-white">

      No Projects Yet

    </h2>

    <p className="mt-4 text-gray-500 dark:text-slate-400">

      Create your first engineering project to begin.

    </p>

    <button
      onClick={() => setShowModal(true)}
      className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-white transition hover:bg-blue-700"
    >

      Create Project

    </button>

  </div>

) : (

  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

    {projects.map((project) => (

      <Link
        key={project.id}
        href={`/project/${project.id}`}
      >

       <motion.div
  whileHover={{
    y: -8,
    scale: 1.02,
  }}
  whileTap={{
    scale: 0.98,
  }}
  transition={{
    duration: 0.25,
  }}
  className="group cursor-pointer rounded-3xl bg-white p-8 shadow-lg transition dark:bg-slate-800"
>

          {/* Icon */}

          <div className="flex items-center justify-between">

            <div className="rounded-2xl bg-blue-100 p-4">

              <FolderOpen className="h-8 w-8 text-blue-600" />

            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

              AI Ready

            </span>

          </div>

          {/* Project Name */}

          <h2 className="mt-8 text-2xl font-bold dark:text-white">

            {project.name}

          </h2>

          {/* Description */}

          <p className="mt-3 text-gray-500 dark:text-slate-400">

            {project.description || "Engineering Project"}

          </p>

          {/* Information */}

          <div className="mt-8 space-y-3 text-gray-600 dark:text-slate-300">

            <div className="flex justify-between">

              <span>Project ID</span>

              <span className="font-semibold">

                #{project.id}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Status</span>

              <span className="text-green-600 font-semibold">

                Active

              </span>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-700">

            <span className="text-sm text-gray-500 dark:text-slate-400">

              Open Workspace

            </span>

            <span className="text-xl transition group-hover:translate-x-2">

              →

            </span>

          </div>

        </motion.div>

      </Link>

    ))}

  </div>

  )

  {/*Modal*/}

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
    >

      <h2 className="text-3xl font-bold dark:text-white">
        Create New Project
      </h2>

      <p className="mt-2 text-gray-500 dark:text-slate-400">
        Create a new EPC engineering workspace.
      </p>

      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateProject();
          }
        }}
        placeholder="Project Name"
        className="mt-8 w-full rounded-xl border border-slate-300 bg-white p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="rounded-xl bg-gray-200 px-6 py-3 transition hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          disabled={creating}
          onClick={handleCreateProject}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>

    </motion.div>

  </div>
)}

     </main>

   );
}