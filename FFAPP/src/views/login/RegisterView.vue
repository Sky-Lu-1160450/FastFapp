<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify as VanNotify } from 'vant';
import { registerUser } from '@/api/user';

const username = ref('');
const password = ref('');
const nickname = ref('');
const avatar = ref('');
const isLoading = ref(false);
const router = useRouter();

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const data = {
      username: username.value,
      password: password.value,
      nickname: nickname.value,
      avatar: avatar.value,
    };

    await registerUser(data);  // Call the registerUser function to send data to the backend

    VanNotify({ type: 'success', message: 'successful registration' });
    router.push({ name: 'login' });  // Redirect to the login page after successful registration
  } catch (error) {
    VanNotify({ type: 'danger', message: 'Registration failed' });
    console.error('Registration failed:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="register-page op-fullscreen">
    <VanNavBar title="Registration Page" left-text="Back" left-arrow @click-left="router.back" />
    <VanForm class="register-page__form" @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="username"
          name="username"
          label="Username"
          placeholder="Please enter the username"
          :rules="[{ required: true, message: 'No Username Input' }]"
        />
        <VanField
          v-model="password"
          name="password"
          label="Password"
          placeholder="Please enter password"
          :rules="[{ required: true, message: 'No Password Input' }]"
        />
        <VanField
          v-model="nickname"
          name="nickname"
          label="Nickname"
          placeholder="What is your Nickname?"
        />
        <VanField
          v-model="avatar"
          name="avatar"
          label="Avatar"
          placeholder="Default Avatar"
        />
      </VanCellGroup>
      <div style="margin: 16px">
        <VanButton :loading="isLoading" round block type="primary" native-type="submit">Register</VanButton>
      </div>
    </VanForm>
  </div>
</template>

<style scoped>
.register-page {
  .register-page__form {
    margin-top: 100px;
  }
}
</style>
