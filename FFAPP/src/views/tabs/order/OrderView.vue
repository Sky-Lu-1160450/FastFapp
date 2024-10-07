<template>
    <div class="order-view">
      <h1>My Orders</h1>
      <div v-if="orders.length" class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <h3>Order #{{ order.id }}</h3>
          <p><strong>Status:</strong> {{ order.status }}</p>
          <p><strong>Delivery Address:</strong> {{ order.address }}</p>
          <p><strong>Phone Number:</strong> {{ order.phone }}</p>
          <p><strong>Total Price:</strong> ${{ order.totalPrice.toFixed(2) }}</p>
          <ul>
            <li v-for="item in order.items" :key="item.id">
              {{ item.name }} - Quantity: {{ item.quantity }}
            </li>
          </ul>
          <p><strong>Order Date:</strong> {{ formatDate(order.createdAt) }}</p>
        </div>
      </div>
      <div v-else>
        <p>No orders found.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user'; // Assuming you have a user store
  import { getUserOrders } from '@/api/order'; // A function to fetch orders for the user
  
  interface OrderItem {
    id: number;
    name: string;
    quantity: number;
  }
  
  interface Order {
    id: number;
    status: string;
    address: string;
    phone: string;
    totalPrice: number;
    items: OrderItem[];
    createdAt: string;
  }
  
  const orders = ref<Order[]>([]);
  
  onMounted(async () => {
  try {
    const userStore = useUserStore();
    const userId = String(userStore.state.userInfo.id); // Convert to string
    if (userId) {
      const response = await getUserOrders(userId); // Pass the string userId
      console.log('Orders response:', response); // Log the response
      orders.value = response; // Store the user's orders
    }
  } catch (error) {
    console.error('Failed to load orders:', error);
  }
});

  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };
  </script>
  
  <style scoped>
  .order-view {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .order-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .order-card h3 {
    margin-bottom: 10px;
    color: #007bff;
  }
  
  .order-card p,
  .order-card ul {
    margin: 5px 0;
    color: #555;
  }
  
  ul {
    padding-left: 20px;
  }
  </style>
  