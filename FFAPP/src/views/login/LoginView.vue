<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/use/useAuth';

const username = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

const onClickLeft = () => history.back();

const onSubmit = async () => {
  try {
    await login({ username: username.value, password: password.value });
    router.push({ name: 'me' });
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Navigate to the registration page
const goToRegister = () => {
  router.push({ name: 'register' });
};
</script>

<template>
  <div class="login-page op-fullscreen">
    <VanNavBar title="Login Page" left-text="Back" left-arrow @click-left="onClickLeft" />
    <VanForm class="login-page__form" @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="username"
          name="username"
          label="Username"
          placeholder="Please enter the username"
          :rules="[{ required: true, message: 'No username input' }]"
        />
        <VanField
          v-model="password"
          name="password"
          label="Password"
          placeholder="Please enter the password "
          :rules="[{ required: true, message: 'No password input' }]"
        />
      </VanCellGroup>
      <div style="margin: 16px">
        <VanButton round block type="primary" native-type="submit" style="margin-top: 50px">Login</VanButton>
        <VanButton round block type="default" @click="goToRegister" style="margin-top: 10px">Register</VanButton>  <!-- Register button -->
      </div>
    </VanForm>
  </div>
</template>

<style scoped>
.login-page {
  .login-page__form {
    margin-top: 100px;
  }
}
</style>
