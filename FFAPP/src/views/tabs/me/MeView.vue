<script setup lang="ts">
import type { ISuperCard } from '@/types'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { ref } from 'vue'
import { useAsync } from '@/use/useAsync'
import { useAuth } from '@/use/useAuth'
import { fetchMePageData, updateUserAddress } from '@/api/me' // Import the address update API
import OpLoadingView from '@/components/OpLoadingView.vue'

const router = useRouter()
const { user, logout } = useAuth()
const { data, pending } = useAsync(fetchMePageData, {
  cards: [],
  superCard: {} as ISuperCard,
})

const editingAddress = ref(false) // Track if we're editing the address
let address = ref(user.value.address || ''); // Access user.address via user.value
const newAddress = ref('') // New address that the user types in

const toggleEditAddress = () => {
  editingAddress.value = !editingAddress.value
}

const saveAddress = async () => {
  try {
    // Ensure user.id is always a string by using .toString() if it's a number
    const userId = typeof user.value.id === 'number' ? user.value.id.toString() : user.value.id;
    
    await updateUserAddress(userId, newAddress.value); // Access user.id via user.value, ensuring it's a string
    
    address.value = newAddress.value;
    // Update only the user info (address) in the store
    const store = useUserStore();
    store.updateUserInfo({ address: newAddress.value });  // Update only the address
    editingAddress.value = false; // Close the edit form
  } catch (error) {
    console.error('Failed to update address:', error);
  }
};

const gotoLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="me-page op-fullscreen">
    <div class="me-page__top">
      <template v-if="user.id">
        <img class="avatar" :src="user.avatar" />
        <div class="name">{{ user.nickname }}</div>
        <div class="account op-thin-border" @click="logout">退出</div>
      </template>
      <template v-else>
        <img class="avatar" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        <div class="name" @click="gotoLogin">请登录</div>
        <div class="account op-thin-border" @click="gotoLogin">账号登录</div>
      </template>
    </div>

    <OpLoadingView :loading="pending" type="skeleton">
      <div class="me-page__card">
        <div class="me-page__card__title">Edit Address</div>
        <div class="me-page__card__items">
          <div class="me-page__card__item">
            <VanIcon name="location-o" size="20"></VanIcon>
            <div class="label">
              <template v-if="!editingAddress">
                <span @click="toggleEditAddress">{{ address || 'My address' }}</span>
              </template>
              <template v-else>
                <input type="text" v-model="newAddress" placeholder="Enter new address" />
                <button @click="saveAddress">Save</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </OpLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.me-page {
  background: var(--op-gray-bg-color);
  padding: 0 10px 75px 10px;

  &__top {
    padding: 10px;
    display: flex;
    align-items: center;
    background: rgb(244, 244, 244);
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name {
      flex: 1;
      font-size: 15px;
      text-align: left;
    }
    .account {
      color: rgb(33, 179, 244);
      font-size: 8px;
      padding: 1px 10px;
      &:before {
        border-color: rgb(33, 179, 244);
        border-radius: 50px;
      }
    }
  }
  &__super-card {
    border-radius: 8px;
    background: rgb(42, 33, 46);
    color: rgb(253, 208, 159);
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 20px;
    margin-bottom: 15px;
    .super-card__left {
      flex: 1;
      &__top {
        display: flex;
        align-items: center;
        .card-img {
          width: 81px;
          height: 23px;
        }
        .divider {
          position: relative;
          width: 1px;
          height: 20px;
          margin: 0 10px;
          &:before {
            content: '';
            position: absolute;
            top: -50%;
            left: 0;
            width: 200%;
            height: 200%;
            transform: scale(0.5);
            background: rgb(253, 208, 159);
          }
        }
        .bean {
          font-size: 12px;
          font-weight: bold;
          align-items: baseline;
        }
        .bean-count {
          font-weight: bold;
          font-size: 22px;
          line-height: 22px;
        }
      }
      &__tips {
        font-size: 12px;
        margin-top: 6px;
        color: rgb(212, 189, 178);
      }
    }
  }
  &__card {
    background: white;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;

    &__title {
      font-weight: bold;
    }
    &__items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    &__item {
      margin-top: 10px;
      text-align: center;
      .label {
        font-size: 12px;
        color: gray;
        margin-top: 5px;
      }
      .count {
        font-weight: bold;
        color: black;
      }
    }
  }
}
</style>
