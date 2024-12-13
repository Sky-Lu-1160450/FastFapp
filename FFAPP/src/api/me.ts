import type { IMeInfo } from '@/types'
import axios from './base'

export const fetchMePageData = () => {
  return axios.get<IMeInfo, IMeInfo>('me_page')
}

// Function to update or add a user address
export const updateUserAddress = (userId: string, address: string): Promise<void> => {
  return axios.post('/auth/updateAddress', { userId, address })
    .then(response => {

      }
    )
    .catch(error => {
      console.error('Failed to update address:', error);
      throw error;
    });
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
