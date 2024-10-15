<script setup lang="ts">
import type { IShopDetail } from '@/types'
import { computed } from 'vue';
import { useToggle } from '@/use/useToggle';

interface IProps {
  data: IShopDetail
}

enum DiscountEnum {
  Reduction = 1,
  Delivery = 2,
  Special = 3,
  Optional = 4,
}

const props = defineProps<IProps>()

const topThreeServices = computed(() => props.data.services.slice(0, 3));
const reduction = computed(() => {
  const reduction = props.data.discounts.find((v) => v.type === DiscountEnum.Reduction);
  return reduction ? reduction.content : [];
});
const reductionLabel = computed(() => {
  return reduction.value.map((v) => `$${v.if} Spend $${v.count} off`);
});
</script>

<template>
  <div class="shop-header">
    <div class="shop-header__info">
      <div class="info__left">
        <div class="shop-name op-ellipsis">
          {{ data.shopName }}<span v-if="data.branch">({{ data.branch }})</span>
        </div>
      </div>

      <div class="delivery">
        <div v-if="data.deliveryTags" class="delivery-tag op-thin-border">
          {{ data.deliveryTags[0] }}
        </div>
      </div>

      <div class="info__right">
        <img :src="data.postUrl" />
      </div>
    </div>

    <div class="shop-header__service">
      <div v-for="v in topThreeServices" :key="v.label" class="service">
        <VanIcon name="passed"></VanIcon>
        {{ v.label }}
      </div>
    </div>

    <div class="shop-header__announcement">{{ data.announcement }}</div>

    <div class="shop-header__discounts">
      <div class="flex">
        <div v-for="v in reductionLabel" :key="v" class="activity op-thin-border">
          {{ v }}
        </div>
      </div>
      <VanIcon name="arrow-down" color="rgb(207, 207, 207)"></VanIcon>
    </div>
  </div>
</template>

<style lang="scss">
.shop-header {
  background: white;
  border-radius: 10px;
  font-size: 14px; /* Increased font size for better readability */
  padding: 15px; /* Added padding for better spacing */
  margin: var(--op-page-padding);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1); /* Slightly lighter shadow for a cleaner look */

  &__info {
    display: flex;
    align-items: center; /* Align elements vertically */
    margin-bottom: 10px; /* Added more space between elements */

    .info__left {
      flex: 1;

      .shop-name {
        font-size: 22px; /* Larger font size for shop name */
        font-weight: bold;
        margin: 0;
      }
    }

    .info__right img {
      width: 60px; /* Increased size for shop image */
      height: 60px;
      border-radius: 10px; /* Added border-radius for a rounded image */
    }
  }

  &__service {
    display: flex;
    margin-bottom: 8px;

    .service {
      margin-right: 10px;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #333;

      .van-icon {
        margin-right: 5px;
      }
    }
  }

  &__announcement {
    color: #555; /* Darkened color for better visibility */
    font-size: 14px;
    margin-bottom: 10px; /* Added margin for spacing */
  }

  &__discounts {
    display: flex;
    align-items: center;
    font-size: 14px;

    .flex {
      flex: 1;
      display: flex;
      flex-wrap: wrap; /* Allows the discounts to wrap if they don't fit */
    }

    .activity {
      display: inline-block;
      color: rgb(247, 68, 68);
      padding: 3px 8px;
      margin-right: 8px;
      margin-bottom: 4px;
      border-radius: 4px; /* Added rounded corners */
      border: 1px solid rgb(247, 68, 68);
    }
  }
}
</style>
