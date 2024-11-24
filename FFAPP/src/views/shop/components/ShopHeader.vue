<script setup lang="ts">
import type { IShopDetail } from '@/types';
import { computed } from 'vue';

interface IProps {
  data: IShopDetail;
}

const props = defineProps<IProps>();

const services = computed(() => props.data.services);

// Limit services to top 3 or fewer
const topThreeServices = computed(() => props.data.services.slice(0, 3));

// Compute the reduction discounts (if any)
const reduction = computed(() => {
  const reduction = props.data.discounts.find((v) => v.type === 1); // Assuming 1 is Reduction type
  return reduction ? reduction.content : [];
});

// Map the reductions for display
const reductionLabel = computed(() => {
  return reduction.value.map((v) => `$${v.if} Spend $${v.count} off`);
});
</script>

<template>
  <div class="shop-header">
    <!-- Shop Info Section -->
    <div class="shop-header__info">
      <div class="info__left">
        <!-- Shop Name -->
        <div class="shop-name op-ellipsis">
          {{ data.shopName }}
        </div>
      </div>

      <!-- Delivery Tag (Optional) -->
      <div class="delivery">
        <div v-if="data.deliveryTags && data.deliveryTags.length" class="delivery-tag op-thin-border">
          {{ data.deliveryTags[0] }}
        </div>
      </div>

      <!-- Shop Image -->
      <div class="info__right">
        <img :src="data.postUrl" alt="Shop Image" />
      </div>
    </div>

    <!-- Services (Top 3) -->
    <div class="shop-header__service" v-if="topThreeServices.length">
      <div v-for="service in topThreeServices" :key="service.label" class="service">
        <VanIcon name="passed" /> {{ service.label }}
      </div>
    </div>

    <!-- Announcement and Delivery Speed -->
    <div v-if="data.announcement" class="shop-header__announcement">{{ data.announcement }}</div>
    <div v-if="data.deliverySpeed" class="shop-header__announcement">{{ data.deliverySpeed }}</div>
    
    <!-- Discounts (Optional) -->
    <div v-if="reductionLabel.length" class="shop-header__discounts">
      <div class="flex">
        <div v-for="reduction in reductionLabel" :key="reduction" class="activity op-thin-border">
          {{ reduction }}
        </div>
      </div>
      <VanIcon name="arrow-down" color="rgb(207, 207, 207)" />
    </div>
  </div>
</template>

<style lang="scss">
.shop-header {
  background: white;
  border-radius: 10px;
  font-size: 14px;
  padding: 15px;
  margin: var(--op-page-padding);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

  &__info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .info__left {
      flex: 1;
      .shop-name {
        font-size: 22px;
        font-weight: bold;
        margin: 0;
      }
    }

    .info__right img {
      width: 85px;
      height: 85px;
      border-radius: 10px;
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
    color: #555;
    font-size: 14px;
    margin-bottom: 10px;
  }

  &__discounts {
    display: flex;
    align-items: center;
    font-size: 14px;

    .flex {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }

    .activity {
      display: inline-block;
      color: rgb(247, 68, 68);
      padding: 3px 8px;
      margin-right: 8px;
      margin-bottom: 4px;
      border-radius: 4px;
      border: 1px solid rgb(247, 68, 68);
    }
  }
}
</style>
