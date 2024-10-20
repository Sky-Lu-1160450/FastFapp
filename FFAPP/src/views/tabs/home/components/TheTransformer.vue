<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ITransformer } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import FontAwesome component
import { faUtensils, faPizzaSlice, faHamburger, faFish, faLeaf ,faBowlRice,faDrumstickBite, faHotdog,faBacon,faBreadSlice , faBeer , faAppleWhole  } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

// Define the props interface for the transformer data
interface IProps {
  data: ITransformer[]
}

// Declare props
defineProps<IProps>()

// Use Vue Router to handle navigation
const router = useRouter()

// Icon map for categories (you can customize the icons based on your categories)
const iconMap: { [key: string]: any } = {
  'Chinese Food': faBowlRice,
  'Fresh Fruit': faAppleWhole  ,
  'Tailand food': faDrumstickBite,
  'Italian Food': faPizzaSlice,
  'Mexican Food': faHotdog, 
  'Indian Food': faLeaf,
  'Japanese Food': faFish,
  'Mediterranean Food': faBacon  ,
  'NewZealand Food': faHamburger
};

// Function to navigate to the specific shop based on label
const gotoShop = (label: string) => {
  const shopIdMap: { [key: string]: number } = {
    'Chinese Food': 2,
    'Fresh Fruit': 1,
    'Tailand food': 5,
    'Italian Food': 6,
    'Mexican Food': 7,
    'Indian Food': 8,
    'Japanese Food': 3,
    'Mediterranean Food': 9,
    'NewZealand Food': 4
  }

// Check if the label is in the map, otherwise log an error
const shopId = shopIdMap[label];
  if (shopId) {
    router.push({ name: 'shop', params: { id: shopId } })
  } else {
    console.error(`Shop ID not found for label: ${label}`)
  }
}
</script>

<template>
  <div class="home-transformer">
    <!-- Loop through transformer data and display each item -->
    <div 
      v-for="v in data" 
      :key="v.label" 
      class="home-transformer__item"
      @click="gotoShop(v.label)" 
    >
      <FontAwesomeIcon :icon="iconMap[v.label]" class="home-transformer__icon" />
      <div class="home-transformer__label">{{ v.label }}</div>
      <!-- <img :src="v.imgUrl || '/default-image.png'" :alt="v.label" class="home-transformer__icon" /> -->
      <!-- <div class="home-transformer__label">{{ v.label }}</div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-transformer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  padding: 10px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }

    &__icon {
      width: 50px;
      height: 50px;
      margin-bottom: 8px;
      border-radius: 50%;
      object-fit: cover;
    }

    &__label {
      font-weight: bold;
      color: #333;
    }
  }
}
</style>
