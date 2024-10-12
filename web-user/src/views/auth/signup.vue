<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-4">注册</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium mb-2">用户名</label>
          <input
            type="text"
            id="username"
            v-model="register.username"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-2">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="register.email"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium mb-2">密码</label>
          <input
            type="password"
            id="password"
            v-model="register.password"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required />
        </div>
        <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
          注册
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const register = reactive({
  username: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  // 在这里处理注册逻辑
  console.log('用户名：', register.username)
  console.log('邮箱：', register.email)
  console.log('密码：', register.password)
}
</script>

<style lang="scss" scoped>
</style>
