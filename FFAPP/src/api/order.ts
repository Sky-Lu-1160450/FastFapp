import axios from './base'

// Define the interface for the response from the backend
interface PlaceOrderResponse {
  message: string;
  orderId: string;
  // Add any other fields that the API returns
}

// Update the placeOrder function to return a Promise of the typed response
export const placeOrder = (orderData: { items: any[], totalPrice: number, deliveryFee: number, userId: string,address: string }): Promise<PlaceOrderResponse> => {
  return axios.post<PlaceOrderResponse>('/order/place', orderData)
    .then(response => {
      console.log("Order placed response:", response)
      return response
  });
};

// Define the interface for an order item
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
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
