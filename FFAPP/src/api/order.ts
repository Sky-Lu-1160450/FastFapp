import axios from './base'

// Define the interface for the response from the backend
interface PlaceOrderResponse {
  orderId: string;
  // Add any other fields that the API returns
}

// Update the placeOrder function to return a Promise of the typed response
export const placeOrder = (orderData: { items: any[], totalPrice: number, deliveryFee: number }): Promise<PlaceOrderResponse> => {
    return axios.post<PlaceOrderResponse>('/order/place', orderData)
      .then(response => response.data);
  };

  export const getUserOrders = (userId) => {
    return axios.get(`/order/user/${userId}`).then(response => response.data);
  };