import apiClient from "@/utils/api";
import { UserType } from "@/utils/typeDefs";

export const getUserProfile = async () => {
  const response = await apiClient.get("/user/me");
  return response.data as UserType;
};

export const getUsers = async () => {
  const response = await apiClient.get("/user");
  return response.data as UserType[];
};
