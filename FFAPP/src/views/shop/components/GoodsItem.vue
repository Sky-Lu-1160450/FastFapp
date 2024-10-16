<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { IGood } from '@/types'
import CartControl from './CartControl.vue'

interface IProps {
  data: IGood
}
const props = defineProps<IProps>()

const router = useRouter()

// Redirect to the goods detail page on click
const gotoGoods = () => {
  router.push({
    name: 'goods',
    params: { id: props.data.id },
  })
}
</script>

<template>
  <div class="shop-goods-item" @click="gotoGoods" v-if="data">
    <img class="img" v-lazy="data.imgUrl" />
    <div class="content">
      <div class="name">{{ data.name }}</div>
      <div class="tips op-ellipsis" v-if="data.tips">{{ data.tips }}</div>
      <div class="extra">
        <span class="count">Sale {{ data.sellCount }}</span>
        <span>Rating {{ data.rating }}</span>
      </div>
      <div class="price">
        <div class="now">$<span>{{ data.price }}</span></div>
        <div class="old">${{ data.oldPrice }}</div>
      </div>
      <div class="cart-control-wrapper">
        <CartControl :data="data" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-goods-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 20px;
  font-size: 14px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  .img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 15px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .tips {
      color: #888;
      font-size: 13px;
      margin-bottom: 6px;
    }

    .extra {
      color: #666;
      font-size: 12px;
      margin-bottom: 10px;

      .count {
        margin-right: 10px;
        font-size: 14px;
      }

      .rating {
        font-size: 14px;
      }
    }

    .price {
      display: flex;
      align-items: baseline;
      margin-top: 8px;

      .now {
        color: #e74c3c;
        margin-right: 8px;

        span {
          font-size: 20px;
          font-weight: 600;
        }
      }

      .old {
        color: #999;
        font-size: 14px;
        text-decoration: line-through;
      }
    }

    .cart-control-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
</style>
