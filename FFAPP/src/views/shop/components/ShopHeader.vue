<script setup lang="ts">
import type { IShopDetail } from '@/types'

interface IProps {
  data: IShopDetail
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="shop-header">
    <div class="shop-header__info">
        <div class="info__left">
            <div class="shop-name op-ellipsis">
            {{ data.shopName }}<span v-if="data.branch">({{ data.branch }})</span>
            </div>
        </div>
        <div class="info__right">
            <img :src="data.postUrl" />
        </div>
    </div>
    <div class="shop-header__service"></div>
    <div class="shop-header__anouncement"></div>
    <div class="shop-header__redbags"></div>
    <div class="shop-header__discounts"></div>
  </div>
</template>
