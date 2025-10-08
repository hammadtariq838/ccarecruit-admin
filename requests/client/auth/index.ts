import apiClient from "@/utils/api";

export const login = async (userData: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/admin-login", userData);
  return response.data;
};

export const changePassword = async (data: { newPassword: string }) => {
  const response = await apiClient.post("/auth/change-password", data);
  return response.data;
};
