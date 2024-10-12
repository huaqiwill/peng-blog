<script lang="ts">
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：推荐文章
*/
// @ts-nocheck
import { useAppStore } from '@/stores/app'
import { useArticleStore } from '@/stores/article'
import { useI18n } from 'vue-i18n'
import { computed, defineComponent, toRef } from 'vue'
import { ArticleCard } from '@/components/ArticleCard'

export default defineComponent({
  name: 'FeatureList',
  components: {
    ArticleCard
  },
  setup() {
    const appStore = useAppStore()
    const articleStore = useArticleStore()
    const { t } = useI18n()
    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.header_gradient_css }
      }),
      gradientText: appStore.themeConfig.background_gradient_style,
      featuredArticles: toRef(articleStore.$state, 'featuredArticles'),
      t
    }
  }
})
</script>

<template>
  <div class="inverted-main-grid py-8 gap-8 box-border">
    <div class="relative overflow-hidden h-56 lg:h-auto rounded bg-ob-deep-800 shadow">
      <div
        class="ob-gradient-plate opacity-90 relative z-10 bg-ob-deep-900 rounded flex justify-start items-end px-8 pb-10 shadow">
        <h2 class="text-3xl pb-8 lg:pb-16">
          <p :style="gradientText">EDITOR'S SELECTION</p>
          <span class="relative text-2xl text-ob-bright font-semibold">
            <svg-icon class="inline-block" icon-class="hot" />
            {{ t('home.recommended') }}
          </span>
        </h2>
      </div>
      <span class="absolute top-0 w-full h-full z-0" :style="gradientBackground" />
    </div>

    <ul class="grid lg:grid-cols-2 gap-8">
      <template v-if="featuredArticles.length > 0">
        <li v-for="article in featuredArticles" :key="article.id">
          <ArticleCard class="home-featured-article" :data="article" />
        </li>
      </template>
      <template v-else>
        <li v-for="n in 2" :key="n">
          <ArticleCard :data="{}" />
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
.home-featured-article {
  .article-content {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .article-footer {
      margin-top: 13px;
    }
  }
}
</style>
