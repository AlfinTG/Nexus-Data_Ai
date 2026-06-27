import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export const createProject = async (projectName: string) => {
  return api.post("/projects/", {
    name: projectName,
    description: "",
  });
};

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