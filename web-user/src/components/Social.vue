<template>
  <a-space class="my-2">
    <a :href="websiteConfig.github" target="_blank" ref="github" v-if="websiteConfig.github">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="github" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.gitee" target="_blank" ref="github" v-if="websiteConfig.gitee">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="gitee" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.twitter" target="_blank" ref="twitter" v-if="websiteConfig.twitter">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="twitter" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.stackoverflow" target="_blank" ref="stackoverflow" v-if="websiteConfig.stackoverflow">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="stackoverflow" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.wechat" target="_blank" ref="wechat" v-if="websiteConfig.wechat">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="wechat" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.qq" target="_blank" ref="qq" v-if="websiteConfig.qq">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="qq" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.weibo" target="_blank" ref="weibo" v-if="websiteConfig.weibo">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="weibo" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.csdn" target="_blank" ref="csdn" v-if="websiteConfig.csdn">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="csdn" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.zhihu" target="_blank" ref="zhifu" v-if="websiteConfig.zhihu">
      <div class="diamond-clip-path diamond-icon">
        <svg-icon icon-class="zhifu" class="fill-current" />
      </div>
    </a>
    <a :href="websiteConfig.juejin" target="_blank" ref="juejin" v-if="websiteConfig.juejin">
      <div class="diamond-clip-path diamond-icon">掘</div>
    </a>
  </a-space>
</template>

<script lang="ts">
/**
 * 文件名：Social.vue
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：
 */
import { computed, defineComponent, toRefs, toRef } from 'vue'
import { useAppStore } from '@/stores/app'

export default defineComponent({
  name: 'Social',
  setup() {
    let appStore = useAppStore()
    return {
      websiteConfig: computed(() => {
        return appStore.websiteConfig
      })
    }
  }
})
</script>

<style scoped>
.custom-social-svg-icon {
  width: 1em;
  height: 1em;
  font-size: 1em;
  vertical-align: -0.15em;
  fill: var(--text-bright);
  stroke: var(--background-primary);
  overflow: hidden;
}
</style>
