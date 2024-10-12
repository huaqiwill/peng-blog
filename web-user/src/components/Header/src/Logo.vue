<template>
  <div class="flex flex-col z-10 text-black cursor-pointer" @click="handleClick">
    <span class="flex font-extrabold text-xl text-gray-800"> 冰冰符号 </span>
    <span class="font-extrabold text-xs uppercase text-gray-600"> BING BLOG </span>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common'
import { useNavigatorStore } from '@/stores/navigator'

const commonStore = useCommonStore()
const navigatorStore = useNavigatorStore()
const router = useRouter()

// 跳转到首页
const handleClick = () => {
  router.push({
    path: '/'
  })
  if (commonStore.isMobile && navigatorStore.openMenu === true) {
    navigatorStore.toggleMobileMenu()
  }
}
</script>
