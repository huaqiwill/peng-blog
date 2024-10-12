<template>
  <a-card hoverable class="ww-full h-48 p-2">
    <!-- 是否为置顶 -->
    <span v-if="article.isTop" class="article-tag">
      <b>
        <svg-icon icon-class="pin" />
        {{ t('settings.pinned') }}
      </b>
    </span>

    <!-- 是否为推荐文章 -->
    <span v-else-if="article.isFeatured" class="article-tag">
      <b>
        <svg-icon icon-class="hot" />
        {{ t('settings.featured') }}
      </b>
    </span>

    <!-- 文章内容 -->
    <div class="flex flex-row flex-nowrap items-center">
      <!-- 文章图片 -->

      <!-- 176 × 99 px -->
      <div class="w-1/3" @click="toArticle">
        <img v-lazy="article.articleCover" class="w-full h-auto" alt="" />
      </div>

      <!-- 文章内容 -->
      <div class="w-2/3 px-4">
        <!-- <span>
          <b v-if="article.categoryName">
            {{ article.categoryName }}
          </b>
          <ob-skeleton v-else tag="b" height="20px" width="35px" />
          <ul v-if="article.tags && article.tags.length > 0">
            <li v-for="tag in article.tags" :key="tag.id">
              <em># {{ tag.tagName }}</em>
            </li>
          </ul>
          <ul v-else-if="article.tags && article.tags.length <= 0">
            <li>
              <em># {{ t('settings.default-tag') }}</em>
            </li>
          </ul>
          <ul v-else>
            <ob-skeleton v-if="!article.tags" :count="2" tag="li" height="16px" width="35px" />
          </ul>
        </span> -->

        <a-typography>
          <a-typography-title :heading="5" @click="toArticle" class="cursor-pointer">
            {{ article.articleTitle }}
          </a-typography-title>
          <a-typography-paragraph class="text-gray-600 text-ellipsis overflow-hidden h-16 leading-normal">
            {{ article.articleContent }}
          </a-typography-paragraph>
        </a-typography>

        <!-- <h2 v-if="article.articleTitle" @click="toArticle" class="text-xl mb-2 text-black" data-dia="article-link">
          <a>
            <span> {{ article.articleTitle }}</span>
            <svg-icon v-if="article.status == 2" icon-class="lock" class="lock-svg" />
          </a>
        </h2> -->

        <!-- <p
          @click="toArticle"
          class="text-gray-600 text-ellipsis overflow-hidden h-16 leading-normal"
          v-if="article.articleContent">
          {{ article.articleContent }}
        </p> -->

        <div v-if="article.author && article.createTime">
          <div class="mt-4 flex flex-row items-center justify-end">
            <a-avatar :size="24" @click="handleAuthorClick(article.author.website)" class="mr-2">
              <img alt="avatar" :src="article.author.avatar" />
            </a-avatar>
            <span class="text-ob-dim">
              <strong
                class="text-ob-normal pr-1.5 hover:text-ob hover:opacity-50 cursor-pointer"
                @click="handleAuthorClick(article.author.website)">
                {{ article.author.nickname }}
              </strong>
              {{ t('settings.shared-on') }} {{ t(`settings.months[${new Date(article.createTime).getMonth()}]`) }}
              {{ new Date(article.createTime).getDate() }}, {{ new Date(article.createTime).getFullYear() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：文章卡片
 */
import { computed, defineComponent, toRefs, getCurrentInstance } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import emitter from '@/utils/mitt'

export default defineComponent({
  name: 'ArticleCard',
  props: ['data'],
  setup(props) {
    const proxy: any = getCurrentInstance()?.appContext.config.globalProperties
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const { t } = useI18n()
    const handleAuthorClick = (link: string) => {
      if (link === '') link = window.location.href
      window.open(link)
    }
    const toArticle = () => {
      let isAccess = false
      userStore.accessArticles.forEach((item: any) => {
        if (item == props.data.id) {
          isAccess = true
        }
      })
      if (props.data.status === 2 && isAccess == false) {
        if (userStore.userInfo === '') {
          proxy.$notify({
            title: 'Warning',
            message: '该文章受密码保护,请登录后访问',
            type: 'warning'
          })
        } else {
          emitter.emit('changeArticlePasswordDialogVisible', props.data.id)
        }
      } else {
        router.push({ path: '/articles/' + props.data.id })
      }
    }
    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.header_gradient_css }
      }),
      article: toRefs(props).data,
      handleAuthorClick,
      toArticle,
      t
    }
  }
})
</script>


<style lang="scss" scoped>
.article-title:hover {
  cursor: default;
}
</style>
