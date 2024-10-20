import type { ILoginInfo, IAuth } from '@/types'
import axios from './base'

export const auth = ({ username, password }: ILoginInfo) => {
  return axios.post<IAuth, IAuth>('/auth/login', {
    username,
    password,
  })
}

// New register function
export const registerUser = (userData: { username: string; password: string; nickname: string; avatar?: string }) => {
  return axios.post('/auth/register', userData);
};

// Function to fetch user details (including address)
export const getUserDetails = (userId: string): Promise<{ address?: string }> => {
  return axios.get(`/user/details/${userId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch user details:', error);
      throw error;
    });
};