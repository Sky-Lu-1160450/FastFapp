//OrderView.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user'; // Import user store
import { getUserOrders } from '@/api/order';  // Import API function to get user orders
import OpLoadingView from '@/components/OpLoadingView.vue'; // Ensure this component is correctly imported

interface OrderItem {
  id: number;
  name: string;
  cartCount: number;
  
}

interface Order {
  id: number;
  status: string;
  address: string;
  phone: string;
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
  userId: number;
}

const orders = ref<Order[]>([]);
const pending = ref(true); // Use this to indicate loading state
const activeTab = ref('Pending'); // Define the active tab

onMounted(async () => {
  try {
    const userStore = useUserStore();
    const userId = String(userStore.state.userInfo.id);
    if (userId) {
      const response = await getUserOrders(userId); // Fetch user orders
      console.log('Orders response:', response); // Log the response
      // Sort orders by createdAt date in descending order
      orders.value = response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      orders.value = response; // Assign the user's orders (assuming response is an array of orders)
    }
  } catch (error) {
    console.error('Failed to load orders:', error);
  } finally {
    pending.value = false; // Set pending to false once data is loaded
  }
});

// Function to filter orders based on status
// Function to filter orders based on status
const filteredOrders = (status: string) => {
  return orders.value.filter((order) => order.status && order.status === status
)};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
</script>

<template>
  <div class="order-view">
    <h1>My Orders</h1>
    <OpLoadingView :loading="pending" type="skeleton">
      <van-tabs v-model="activeTab" sticky offset-top="54">
        <van-tab title="Pending">
          <div v-if="!pending && filteredOrders('Pending').length" class="orders-list">
            <div v-for="order in filteredOrders('Pending')" :key="order.id" class="order-card">
              <h3>Order #{{ order.id }}</h3>
              <p><strong>Status:</strong> {{ order.status }}</p>
              <p><strong>Delivery Address:</strong> {{ order.address }}</p>
              <!-- <p><strong>Phone Number:</strong> {{ order.phone }}</p> -->
              <p><strong>Total Price:</strong> ${{ order.totalPrice.toFixed(2) }}</p>
              <ul>
                <li v-for="item in order.items" :key="item.id">
                  {{ item.name }} - Quantity: {{ item.cartCount  }}
                </li>
              </ul>
              <p><strong>Order Date:</strong> {{ formatDate(order.createdAt) }}</p>
            </div>
          </div>
          <div v-else>
            <p>No pending orders found.</p>
          </div>
        </van-tab>
        <van-tab title="Completed">
          <div v-if="!pending && filteredOrders('Completed').length" class="orders-list">
            <div v-for="order in filteredOrders('Completed')" :key="order.id" class="order-card">
              <h3>Order #{{ order.id }}</h3>
              <p><strong>Status:</strong> {{ order.status }}</p>
              <p><strong>Delivery Address:</strong> {{ order.address }}</p>
              <p><strong>Phone Number:</strong> {{ order.phone }}</p>
              <p><strong>Total Price:</strong> ${{ order.totalPrice.toFixed(2) }}</p>
              <ul>
                <li v-for="item in order.items" :key="item.id">
                  {{ item.name }} - Quantity: {{ item.cartCount }}
                </li>
              </ul>
              <p><strong>Order Date:</strong> {{ formatDate(order.createdAt) }}</p>
            </div>
          </div>
          <div v-else>
            <p>No completed orders found.</p>
          </div>
        </van-tab>
      </van-tabs>
    </OpLoadingView>
  </div>
</template>

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
