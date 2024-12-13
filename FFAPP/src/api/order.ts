import axios from './base'

interface PlaceOrderResponse {
  message: string;
  orderId: string;
}

// Update the placeOrder function to return a Promise of the typed response
export const placeOrder = (
  orderData: { 
    items: any[], 
    totalPrice: number, 
    deliveryFee: number,
    userId: string,
    address: string 
  }
): Promise<PlaceOrderResponse> => {
  return axios.post<PlaceOrderResponse, PlaceOrderResponse>('/order/place', orderData)
    .then( response => {
      console.log("Order placed response:", response)
      return response
  });
};

// Define the interface for an order item
interface OrderItem {
  id: number;
  name: string;
  cartCount: number;
}

// Define the interface for an order response
interface UserOrder {
  id: number;
  status: string;
  address: string;
  phone: string;
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
  userId: number;
}

// Function to fetch orders for the logged-in user
export const getUserOrders = (userId: string): Promise<UserOrder[]> => {
  return axios.get(`/order/user/${userId}`)
    .then(response => {
      console.log("Orders response received from backend:", response);
      return response;
    })
    .catch(error => {
      console.error("Failed to get user orders:", error);
      throw error;
    });
};
