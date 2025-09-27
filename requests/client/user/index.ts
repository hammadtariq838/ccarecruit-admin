import apiClient from '@/utils/api';
import { UserType } from '@/utils/typeDefs';

export const getUserProfile = async () => {
  const response = await apiClient.get('/user/me');
  return response.data as UserType;
};
