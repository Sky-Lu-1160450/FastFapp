import type { IMenuList } from '@/types';
import axios from './base';

// Fetch the goods list for the given shop ID asynchronously
export const fetchGoodsListData = async (shopId: string): Promise<IMenuList> => {
  try {
    const response = await axios.get<IMenuList>(`/goods_list`, {
      params: { shopId },
    });
    return response;  // Return the data part of the response
  } catch (error) {
    console.error("Error fetching goods list data:", error);
    throw error;
  }
};
