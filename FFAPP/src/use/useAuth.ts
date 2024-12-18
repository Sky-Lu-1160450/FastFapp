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

    // Ensure userInfo includes address and id
    store.setInfo({
      token,
      userInfo: {
        ...userInfo,  // Spread the existing userInfo
        address: userInfo.address || '',  // Provide a default empty address if not set
        id: userInfo.id || ''  // Ensure id is set
      }
    });

    console.log('User logged in:', userInfo);  // Log the userInfo object after login
  };

  // Register function
  const register = async (userData: { username: string; password: string; nickname: string; avatar?: string }) => {
    await registerUser(userData);  // Call the registerUser API
    console.log('User registered:', userData);  // Log user data after registration
  };

  const logout = () => {
    store.removeInfo();
  };

  return {
    user,
    login,
    register,
    logout,
  };
}
