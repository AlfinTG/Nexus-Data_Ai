import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

// Create a new project
export const createProject = async (projectName: string) => {
  return api.post("/projects/", {
    name: projectName,
    description: "",
  });
};

// Get all projects
export const getProjects = async () => {
  return api.get("/projects/");
};

// Upload a PDF to a project
export const uploadFile = async (
  projectId: number,
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);

  return api.post(
    `/projects/${projectId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getProjectDocuments = async (projectId: number) => {
  return api.get(`/projects/${projectId}/documents`);
};

export const getDocument = async (documentId: number) => {
  return api.get(`/projects/documents/${documentId}`);
};

export const askAI = (projectId: number, query: string) => {
  return api.post("/chat/ask", {
    project_id: projectId,
    query,
    top_k: 5,
  });
};