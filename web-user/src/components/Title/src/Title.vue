<script lang="ts">
/**
 * 文件名：Title.vue
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：标题
*/
import { useAppStore } from '@/stores/app'
import { computed, defineComponent, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    },
    id: String,
    icon: String
  },
  setup(props) {
    const { t } = useI18n()
    const appStore = useAppStore()
    const titleStr = toRefs(props).title
    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.header_gradient_css }
      }),
      titleStr,
      t
    }
  }
})
</script>

<template>
  <p :id="id" class="relative opacity-90 flex items-center pt-12 pb-2 mb-8 text-3xl text-ob-bright uppercase">
    <svg-icon v-if="icon" :icon-class="icon" class="inline-block mr-2" />
    {{ t(titleStr) }}
    <!-- 背景线 -->
    <!-- <span class="absolute bottom-0 h-1 w-24 rounded-full" :style="gradientBackground" /> -->
  </p>
</template>