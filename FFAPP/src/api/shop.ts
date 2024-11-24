import type { IShop, IList, IPaginate, IShopDetail } from '@/types'
import axios from './base'

export const fetchShopList = ({ _page, _limit }: IPaginate) => {
  return axios.get<IList<IShop>, IList<IShop>>('shop_list', {
    params: {
      _page,
      _limit,
    },
  })
}

export const fetchShopPageData = async (id: string): Promise<IShopDetail> => {
  try {
    const response = await axios.get<IShopDetail>(`shop_page/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error;
  }
};