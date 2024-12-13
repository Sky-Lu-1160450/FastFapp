import type { IMenu } from '@/types';
import axios from './base';

// Fetch the goods list for the given shop ID asynchronously
export const fetchGoodsListData = async (shopId: string): Promise<IMenu[]> => {
  try {
    const response = await axios.get<IMenu[]>(`/goods_list`, {
      params: { shopId },
    });
    return response;
  } catch (error) {
    console.error("Error fetching goods list data:", error);
    throw error;
  }
};
