import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IGood } from '@/types'

export interface ICartState {
  items: IGood[]
  checkedIds: number[]
}
export const useCartStore = defineStore('cart', () => {
  const state: ICartState = reactive({
    items: [],
    checkedIds: []
  })

  const total = computed(() => state.items.reduce((p, v) => p + v.cartCount, 0))
  const totalPrice = computed(() =>
    state.items.reduce((p, v) => p + v.price * v.cartCount, 0).toFixed(2)
  )
  const totalOldPrice = computed(() =>
    state.items.reduce((p, v) => p + v.oldPrice * v.cartCount, 0).toFixed(2)
  )
  const isAllChecked = computed(() => state.items.length === state.checkedIds.length)


  // Delivery Fee Computation: $0 if total price >= $60, otherwise $10
  const deliveryFee = computed(() => {
    return parseFloat(totalPrice.value) >= 60 ? 0 : 10
  })

  // Final Price Computation: Total Price + Delivery Fee
  const finalPrice = computed(() => {
    return (parseFloat(totalPrice.value) + deliveryFee.value).toFixed(2)
  })

  const cartCountById = (id: number) => {
    return state.items.find((v) => v.id === id)?.cartCount || 0;  // Return 0 if item is not found
  };
  
  const pushProductToCart = (item: IGood) => {
    const cartItem = state.items.find((v) => v.id === item.id);
    if (cartItem) {
      cartItem.cartCount++;  // Increment quantity
    } else {
      item.cartCount = 1;  // Initialize cartCount if this is the first time the item is added
      state.items.push(item);  // Add new item to the cart
    }
    
    if (!state.checkedIds.includes(item.id)) {
      state.checkedIds.push(item.id);  // Check the item by default
    }
  };
  

  const removeProductFromCart = (item: IGood) => {
    const cartItemIndex = state.items.findIndex((v) => v.id === item.id)
    const cartItem = state.items[cartItemIndex]
    if (cartItem) {
      cartItem.cartCount--
      if (cartItem.cartCount === 0) {
        state.items.splice(cartItemIndex, 1)
        const checkIndex = state.checkedIds.findIndex((v) => v === item.id)
        if (checkIndex > -1) {
          state.checkedIds.splice(checkIndex, 1)
        }
      }
    }
  }
  const setCartItems = (items: IGood[]) => {
    state.items = items
    state.checkedIds = items.filter((v) => v.checked).map((v) => v.id)
  }
  const setCheckedIds = (ids: number[]) => {
    state.checkedIds = ids
  }
  const toggleAllChecked = (isAllChecked: boolean) => {
    const ids = isAllChecked ? state.items.map((v) => v.id) : []
    state.checkedIds = ids
  }

  return {
    state,
    total,
    totalPrice,
    totalOldPrice,
    deliveryFee, // Added delivery fee
    finalPrice,
    isAllChecked,
    cartCountById,
    pushProductToCart,
    removeProductFromCart,
    setCartItems,
    setCheckedIds,
    toggleAllChecked
  }
})
