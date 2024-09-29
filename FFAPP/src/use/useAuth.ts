import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { auth, registerUser } from '@/api/user';  // Import registerUser API
import type { ILoginInfo } from '@/types';

export function useAuth() {
  const store = useUserStore();
  const user = computed(() => store.getUserInfo);

  // Login function
  const login = async (data: ILoginInfo) => {
    const { token, userInfo } = await auth(data);
    store.setInfo({ token, userInfo });
  };

  // Register function
  const register = async (userData: { username: string; password: string; nickname: string; avatar?: string }) => {
    await registerUser(userData);  // Call the registerUser API
  };

  const logout = () => {
    store.removeInfo();
  };

  return {
    user,
    login,
    register,  // Add register function
    logout,
  };
}
