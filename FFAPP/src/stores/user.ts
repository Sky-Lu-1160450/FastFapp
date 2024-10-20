import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUserInfo } from '@/types'
import { useLocalStorage } from '@/use/useLocalStorage'

export interface IUserState {
  userInfo: IUserInfo
  token: string
}

const getDefaultUserInfo: () => IUserInfo = () => ({
  id: '',
  avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  nickname: 'Login',
  address: '', // Add address field 
})

export const useUserStore = defineStore('user', () => {
  const {
    value: $userInfo,
    setValue: $setUserInfoValue,
    removeItem: $removeUserInfoItem,
  } = useLocalStorage('userInfo', getDefaultUserInfo())
  const { setValue: $setTokenValue, removeItem: $removeTokenItem } = useLocalStorage('token', '')
  const state = ref({
    userInfo: getDefaultUserInfo(),
    token: '',
  })

  const getUserInfo = computed(() => {
    // 为什么不直接读 localStorage 的值呢？
    // 因为读取 localStorage 是比较耗时的操作，所以这里先读 store
    if (!state.value.userInfo || !state.value.userInfo.id) {
      state.value.userInfo = $userInfo.value
    }
    return state.value.userInfo
  })

  const setInfo = ({ token, userInfo }: IUserState) => {
    state.value.userInfo = {
      ...userInfo,
      address: userInfo.address || '', 
    };
    state.value.token = token;
    $setUserInfoValue(state.value.userInfo);
    $setTokenValue(token);
  };

  const updateUserInfo = (updatedUserInfo: Partial<IUserInfo>) => {
    state.value.userInfo = { ...state.value.userInfo, ...updatedUserInfo };
    $setUserInfoValue(state.value.userInfo);
  };

  const removeInfo = () => {
    state.value.userInfo = getDefaultUserInfo()
    state.value.token = ''
    // state.value.userInfo.address = '';
    $removeUserInfoItem()
    $removeTokenItem()
  }

  return {
    state,
    getUserInfo,
    setInfo,
    updateUserInfo,
    removeInfo,
  }
})
