<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';  // Make sure this import is added
import CartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart.png';
import EmptyCartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart-o.png';
import { useToggle } from '@/use/useToggle';
import { useTransition } from '@/use/useTransition';
import { useEventBus } from '@/use/useEventBus';
import GoodsItem from './GoodsItem.vue';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import { placeOrder } from '@/api/order';

const router = useRouter();
const store = useCartStore();
const userStore = useUserStore(); // Use this store to get the userId
const packageFee = ref(5);
const cartLogo = computed(() => (store.total ? CartLogo : EmptyCartLogo));
const [isCartListShown, toggleCartListShown] = useToggle(false);
const eventBus = useEventBus();
const { items, start, beforeEnter, enter, afterEnter } = useTransition();

eventBus.on('cart-add', (el: any) => {
  start(el);
});

const showCartListPopup = () => {
  if (!store.total) {
    return;
  }
  toggleCartListShown();
};

const removeAll = () => {
  Dialog({
    title: '确定清空购物车?',
  })
    .then(() => {
      store.setCartItems([]);
      toggleCartListShown();
    })
    .catch(() => {
      // on cancel
    });
};
const checkout = async () => {
  if (!store.total) {
    Dialog.alert({
      title: 'Error',
      message: 'No items in the cart.',
    });
    return;
  }

  // Check if the user is logged in
  const userId = String(userStore.state.userInfo.id);
  const address = userStore.state.userInfo.address;  // Get the user's address from the user store

  console.log('User Info:', userStore.state.userInfo);
  console.log('User ID:', userId);
  console.log('User Address:', address);

  if (!userId || userId === 'undefined' || userId === '' || !address) {
    Dialog.alert({
      title: 'Error',
      message: 'You must be logged in and have an address to place an order.',
    });
    // Optionally, redirect to the login page
    router.push({ name: 'me' });
    return;
  }

  try {
    // Confirm before placing the order
    await Dialog.confirm({
      title: 'Place Order',
      message: `Are you sure you want to place the order for $${store.finalPrice}?`,
    });
    // Log cart items and their quantities
    console.log('Cart items:', store.state.items);
    store.state.items.forEach(item => {
      console.log(`Item: ${item.name}, Quantity: ${item.cartCount}`);
    });

    // Prepare order data
    const orderData = {
      items: store.state.items,
      totalPrice: parseFloat(store.totalPrice),
      deliveryFee: store.deliveryFee,
      userId: userId,
      address: address,
    };

    console.log('Placing order with data:', orderData);

    // Call the backend to place the order
    const response = await placeOrder(orderData);

    console.log('Order response received from backend:', response);

    if (response && response.orderId) {
      // Show success message
      await Dialog.alert({
        title: 'Order Successful',
        message: 'Your order has been placed successfully.',
      });

      // Clear the cart and redirect to the home page
      store.setCartItems([]);  // Clear the cart after placing the order
      router.push({ name: 'home' });  // Redirect to the home page
    } else {
      throw new Error('Unexpected response format');
    }

  } catch (error: any) {
    console.error('An error occurred during order placement:', error);

    const errorMessage = error?.message || 'Failed to place the order. Please try again later.';

    // Show error message
    Dialog.alert({
      title: 'Error',
      message: errorMessage,
    });
  }
};

</script>

<template>
  <div class="shop-cart">
    <VanPopup v-model:show="isCartListShown" round position="bottom">
      <div class="shop-cart__popup">
        <!-- <div class="shop-cart__tips">
          <div>满49减3，还差<span>24.2</span>元<span> 去凑单></span></div>
          <div class="tips-detail">已包含:配送费减 5、特价优惠 20 元</div>
        </div> -->
        <div class="popup__all">
          <VanCheckbox
            checked-color="rbg(31,175,243)"
            :model-value="store.isAllChecked"
            @update:model-value="(isAllChecked) => store.toggleAllChecked(isAllChecked)"
          >
            <span class="all-label">Select All</span>
          </VanCheckbox>
          <div class="all-total">(Select{{ store.total }})</div>
          <span class="all-remove" @click="removeAll"><VanIcon name="delete-o" />ClearAll</span>
        </div>
        <div class="popup__goods">
          <VanCheckboxGroup
            checked-color="rbg(31,175,243)"
            :model-value="store.state.checkedIds"
            @update:model-value="(ids) => store.setCheckedIds(ids)"
          >
            <div v-for="v in store.state.items" :key="v.id" class="goods-item">
              <VanCheckbox :name="v.id" />
              <GoodsItem class="flex" :data="v" />
            </div>
          </VanCheckboxGroup>
        </div>
        <div class="popup__fee">
          <span>Delivery Fee</span>
          <span class="label">
            $<span>{{ store.deliveryFee }}</span>
          </span>
        </div>
        <!-- Final Price -->
        <div class="popup__fee">
          <span>Final Price</span>
          <span class="label">
            $<span>{{ store.finalPrice }}</span>
          </span>
        </div>
        <div class="popup__fee checkout-section">
          <div class="final-price">
            <span>Final Price</span>
            <span class="label">
              $<span>{{ store.finalPrice }}</span>
            </span>
          </div>
          <div class="checkout-btn">
            <VanButton type="primary" round @click="checkout">Checkout and Place Order</VanButton>
          </div>
        </div>
      </div>
    </VanPopup>
    <!-- <div class="shop-cart__tips">配送费<span>满0.01减7</span>、全店<span>满49减3</span></div> -->
    <div class="shop-cart__content" @click="showCartListPopup">
      <div class="content__left">
        <div class="cart-logo">
          <img :src="cartLogo" />
          <div v-if="store.total" class="total">{{ store.total }}</div>
        </div>
        <div class="cart-info">
          <div class="cart-info__price">
            <template v-if="store.total">
              <span class="cart-info__price--now">
                &yen;<span>{{ store.totalPrice }}</span>
              </span>
              <span class="cart-info__price--old">${{ store.totalOldPrice }}</span>
            </template>
            <span v-else class="cart-info__price--empty">No Products</span>
          </div>
          <!-- <div class="cart-info__desc">另需配送费 {{ packageFee }} 元</div> -->
        </div>
      </div>
      <div class="content__right">
        <div v-if="store.total" class="order-btn">
          <div class="label">Checkout</div>
          <div> &yen;{{ store.totalPrice }}</div>
        </div>
        <div v-else class="order-btn order-btn--empty">Order Min $20</div>
      </div>
    </div>
    <div class="shop-cart__ball-container">
      <div v-for="(v, i) in items" :key="i">
        <Transition @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
          <div v-show="v.isShown" class="ball">
            <div class="inner"></div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0;
  background: white;
  --van-checkbox-size: 16px;

  &__popup {
    background: var(--op-gray-bg-color);
    .popup__all {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      background: white;
      .all-label {
        font-size: 14px;
        font-weight: bold;
      }
      .all-total {
        flex: 1;
        color: gray;
        font-size: 12px;
      }
      .all-remove {
        color: gray;
      }
    }

    .popup__goods {
      margin-bottom: 10px;
      padding: 15px 10px 0 10px;
      background: white;
      max-height: 400px;
      overflow: auto;
      .goods-item {
        display: flex;
        margin-bottom: 15px;

        .van-checkbox {
          margin-right: 10px;
        }

        .flex {
          flex: 1;
        }
      }
    }
    .popup__fee {
      display: flex;
      justify-content: space-between; /* Aligns elements to opposite ends */
      align-items: center; /* Vertically centers the items */
      padding: 14px;
      font-size: 14px;
      background: rgb(254, 254, 254);

      .label {
      
        font-size: 14px;
        color: gray;
        .fee {
          color: red;
          font-size: 16px;
        }
      }
      .total-price {
        background-color: #007bff; /* Modern blue color */
        color: white;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
        border-radius: 25px; /* Rounded button shape */
        cursor: pointer;
        text-align: center;

        transition: background-color 0.3s ease; /* Smooth hover effect */
      }
      .total-price:hover {
        background-color: #0056b3; /* Darker blue on hover */
      }
    }
  }

  &__tips {
    text-align: center;
    background: rgb(253, 245, 222);
    font-size: 12px;
    padding: 8px 0;
    span {
      color: rgb(255, 61, 61);
    }
    .tips-detail {
      color: gray;
    }
  }

  &__content {
    width: 100%;
    padding: 0px 10px;
    height: 45px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content__left {
      display: flex;
      align-items: center;
      .cart-logo {
        position: relative;
        img {
          width: 50px;
          height: 44px;
        }
        .total {
          position: absolute;
          right: 0;
          top: 2px;
          transform: translateX(40%);
          width: 17px;
          height: 17px;
          background: rgb(255, 61, 61);
          color: white;
          border-radius: 50%;
          text-align: center;
          font-size: 12px;
          line-height: 17px;
        }
      }

      .cart-info {
        color: gray;
        margin-left: 10px;
        font-size: 12px;

        &__price {
          line-height: 18px;

          &--now {
            font-weight: bold;
            color: rgb(20, 16, 16);
            span {
              font-size: 18px;
            }
          }
          &--old {
            text-decoration: line-through;
          }
          &--empty {
            font-weight: bold;
          }
        }
      }
    }
    .content__right {
      .order-btn {
        height: 36px;
        padding: 0 18px;
        text-align: center;
        color: white;
        border-radius: 18px;
        font-size: 12px;
        background: var(--op-primary-color);
        .label {
          font-size: 14px;
          padding-top: 2px;
        }

        &--empty {
          font-size: 16px;
          background: rgb(152, 152, 152);
          line-height: 36px;
        }
      }
    }
  }

  &__ball-container {
    .ball {
      position: fixed;
      bottom: 10px;
      left: 25px;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--op-primary-color);
        transition: all 0.3s linear;
      }
    }
  }
}
</style>
