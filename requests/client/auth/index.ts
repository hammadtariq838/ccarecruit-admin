import apiClient from "@/utils/api";

export const login = async (userData: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/login", userData);
  return response.data;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const verifyResetToken = async (token: string) => {
  const response = await apiClient.post("/auth/verify-token", {
    token,
  });
  return response.data;
};

export const deleteAccount = async () => {
  const response = await apiClient.delete("/auth/delete-account");
  return response.data;
};

export const changePassword = async (data: { newPassword: string }) => {
  const response = await apiClient.post("/auth/change-password", data);
  return response.data;
};
