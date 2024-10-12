<template>
  <a-card class="mb-4">
    <SubTitle :title="'titles.notice'" icon="notice" />
    <div class="mx-auto">
      <span class="text-sm font-medium text-right notice"> {{ notice }}</span>
    </div>
  </a-card>
</template>

<script lang="ts">
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：公告
 */
import { computed, defineComponent } from 'vue'
import { SubTitle } from '@/components/Title'
import { useAppStore } from '@/stores/app'

export default defineComponent({
  name: 'Notice',
  components: { SubTitle },
  setup() {
    const appStore = useAppStore()
    return {
      /* 公告内容 */
      notice: computed(() => {
        return appStore.websiteConfig.notice
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.notice {
  word-wrap: break-word;
  word-break: break-all;
}
</style>
