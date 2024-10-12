<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-4">登录</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium mb-2">用户名</label>
          <input
            type="text"
            id="username"
            v-model="loginData.username"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium mb-2">密码</label>
          <input
            type="password"
            id="password"
            v-model="loginData.password"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required />
        </div>
        <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
          登录
        </button>
      </form>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'

const loginData = reactive({
  username: '',
  password: ''
})

const handleSubmit = () => {
  // 在这里处理登录逻辑
  console.log('用户名：', loginData.username)
  console.log('密码：', loginData.password)
}
</script>
  
<style lang="scss" scoped>
</style>
  