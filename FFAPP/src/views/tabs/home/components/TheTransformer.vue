<script setup lang="ts">
import type { ITransformer } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Importing FontAwesome component

// Define the props interface
interface IProps {
  data: ITransformer[]
}

// Use defineProps to declare the props
defineProps<IProps>()
</script>

<template>
  <div class="home-transformer">
    <div v-for="v in data" :key="v.label" class="home-transformer__item">
      <!-- <img :src="v.imgUrl" :alt="v.label" class="home-transformer__icon" /> -->
      <div class="home-transformer__label">{{ v.label }}</div>
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
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #e0e0e0;
    }

    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 5px;
    }

    &__label {
      font-weight: bold;
    }
  }
}
</style>
