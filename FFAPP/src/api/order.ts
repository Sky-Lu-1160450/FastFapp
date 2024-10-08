import axios from './base'

// Define the interface for the response from the backend
interface PlaceOrderResponse {
  message: string;
  orderId: string;
  // Add any other fields that the API returns
}

// Update the placeOrder function to return a Promise of the typed response
export const placeOrder = (orderData: { items: any[], totalPrice: number, deliveryFee: number, userId: string }): Promise<PlaceOrderResponse> => {
  return axios.post<PlaceOrderResponse>('/order/place', orderData)
    .then(response => {
      console.log("response 1", response)
      return response
  });
};

// Explicitly specify the type of userId
export const getUserOrders = (userId: string) => {
  return axios.get(`/order/user/${userId}`).then(response => response.data);
};
