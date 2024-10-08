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

    VanNotify({ type: 'success', message: '注册成功' });
    router.push({ name: 'login' });  // Redirect to the login page after successful registration
  } catch (error) {
    VanNotify({ type: 'danger', message: '注册失败，请重试' });
    console.error('Registration failed:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="register-page op-fullscreen">
    <VanNavBar title="注册" left-text="返回" left-arrow @click-left="router.back" />
    <VanForm class="register-page__form" @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <VanField
          v-model="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <VanField
          v-model="nickname"
          name="nickname"
          label="昵称"
          placeholder="请输入昵称"
        />
        <VanField
          v-model="avatar"
          name="avatar"
          label="头像"
          placeholder="请输入头像链接"
        />
      </VanCellGroup>
      <div style="margin: 16px">
        <VanButton :loading="isLoading" round block type="primary" native-type="submit">注册</VanButton>
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
