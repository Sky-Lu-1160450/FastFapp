<script setup lang="ts">
import type { IMenu, IGood } from '@/types'
import { ref, watch } from 'vue'
import OpLoadingView from '@/components/OpLoadingView.vue'
import { useAsync } from '@/use/useAsync';
import { fetchGoodsListData } from '@/api/goods';
import { useRoute } from 'vue-router'
import GoodsItem from './GoodsItem.vue';
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(
  () => fetchGoodsListData(id as string),
  [] as IMenu[]
);

const { setCartItems } = useCartStore()

watch(data, (nv) => {
  if (Array.isArray(nv)) {  // Check if `nv` is an array before reducing
    const cartGoods = nv
      .map((category: IMenu) => category.goods)  // Extract the goods array from each category
      .flat()  // Flatten the array of arrays into a single array of goods
      .filter((good: IGood) => good.cartCount > 0);  // Filter out goods with a cartCount of 0

    setCartItems(cartGoods);  // Update the cart items with the filtered goods
  } else {
    console.error('Expected data to be an array, but got:', nv);
  }
});

const categoryActive = ref(0)
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-goods-list">
      <!-- <VanSidebar v-model="categoryActive">
        <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"></VanSidebarItem>
      </VanSidebar> -->
      <div class="list">
        <!-- Display categories and their respective goods -->
        <template v-for="v in data" :key="v.label">
          <div class="category-name">{{ v.label }}</div>
          <GoodsItem v-for="cv in v.goods" :key="cv.id" :data="cv" />
        </template>
      </div>
    </div>
  </OpLoadingView>
</template>

<style lang="scss" scoped>
.shop-goods-list {
  --van-sidebar-selected-border-color: none;
  --van-sidebar-padding: 14px var(--van-padding-sm);
  --van-sidebar-font-size: 13px;
  

  display: flex;

  .list {
    flex: 1;
    margin: 0 10px;

    .category-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      padding: 10px 0;
      border-bottom: 2px solid #eaeaea;  // Subtle divider below category name
      color: #333;
    }
  }
}
</style>
