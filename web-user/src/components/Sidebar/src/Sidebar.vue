<template>
  <div v-show="!isMobile">
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：侧边栏
 */
import { computed, defineComponent } from 'vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()
const isMobile = computed(() => commonStore.isMobile)
</script>