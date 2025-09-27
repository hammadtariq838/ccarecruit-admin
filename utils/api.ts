import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_UI_URL as string;

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
