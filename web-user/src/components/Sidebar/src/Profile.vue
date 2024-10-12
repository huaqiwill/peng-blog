<template>
  <a-card class=" mb-4">
    <div
      class="ob-gradient-cut-plate   flex justify-center items-center mt-2 duration-300" data-dia="author">
      <div class="w-full flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <a-avatar :size="64">
            <img :src="websiteConfig.authorAvatar" />
          </a-avatar>
          <h3 class="text-center pt-2 text-xl font-semibold text-ob-bright">
            {{ websiteConfig.author }}
          </h3>
          <p class="pt-4 px-10 w-full text-s text-center"
             v-html="websiteConfig.authorIntro" />
          <p class="mt-2">
            湖南.娄底
          </p>
        </div>

        <!-- 社交媒体组件 -->
        <Social />

        <a-space size="large">
          <!-- 文章数 -->
          <div class="text-center">
            <p class="text-ob-bright text-base">
              {{ articleCount }}
            </p>
            <p class="text-base">
              {{ t('settings.articles') }}
            </p>
          </div>
          <!-- 说说数 -->
          <div class="text-center">
            <p class="text-ob-bright text-base">
              {{ talkCount }}
            </p>
            <p class="text-base ">
              {{ t('settings.talks') }}
            </p>
          </div>
          <!-- 分类数 -->
          <div class="text-center">
            <p class="text-ob-bright text-base">
              {{ categoryCount }}
            </p>
            <p class="text-base">
              {{ t('settings.categories') }}
            </p>
          </div>
          <!-- 标签数 -->
          <div class="text-center">
            <p class="text-ob-bright text-base">
              {{ tagCount }}
            </p>
            <p class="text-base">
              {{ t('settings.tags') }}
            </p>
          </div>
        </a-space>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：账户组件
 */
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import Social from '@/components/Social.vue'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()
const { t } = useI18n()

const defaultSrc = 'https://static.linhaojun.top/aurora/config/52a81cd2772167b645569342e81ce312.jpg'
/* 头像的样式 */
const avatarClass = computed(() => {
  return {
    'ob-avatar': true,
    [appStore.themeConfig.profile_shape]: true
  }
})
const themeConfig = computed(() => appStore.themeConfig)
const gradientBackground = computed(() => {
  return {
    background: appStore.themeConfig.header_gradient_css
  }
})

const websiteConfig = computed(() => {
  return appStore.websiteConfig
})

onMounted(() => {
  console.log('网站的头像：==》')
  console.log(appStore.websiteConfig.authorAvatar)
})

// 文章数
const articleCount = computed(() => appStore.articleCount)

// 说说数
const talkCount = computed(() => appStore.talkCount)

// 分类数
const categoryCount = computed(() => appStore.categoryCount)

// 标签数
const tagCount = computed(() => appStore.tagCount)

</script>

<style lang="scss" scoped>
.profile {
  top: -7%;
  height: 100%;
  max-height: 100%;
}
</style>
