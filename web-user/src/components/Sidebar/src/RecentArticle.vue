<template>
  <a-list class="mb-4">
    <template #header>
      <SubTitle title="最新文章" icon="quote" />
      <!-- <icon-plus :style="{ fontSize: '32px' }" />
      <span :class="titleClass">最新文章</span> -->
    </template>
    <a-list-item class="list-item" v-for="article in articles" :key="article.id" @click="toArticle(article)">
      <a-link :href="pathName(article)">{{ article.articleTitle }}</a-link>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
// 最新文章

import { onMounted, ref, toRef } from 'vue'
import { SubTitle } from '@/components/Title'
import { useCommentStore } from '@/stores/comment'
import { useI18n } from 'vue-i18n'
import markdownToHtml from '@/utils/markdown'
import api from '@/api/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const commentStore = useCommentStore()
const { t } = useI18n()

onMounted(() => {
  fetchArticles()
})

const formatTime = (time: any): any => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + '-' + month + '-' + day
}

const comments = toRef(commentStore.$state, 'recentComment')
const defaultSrc = 'https://static.linhaojun.top/aurora/config/0af1901da1e64dfb99bb61db21e716c4.jpeg'
const articles = ref([])

const toArticle = (article: any) => {
  router.push({ path: '/articles/' + article.id })
}

const pathName = (article: any) => {
  return '/articles/' + article.id
}

const fetchArticles = () => {
  api
    .getArticles({
      current: 1,
      size: 10
    })
    .then(({ data }) => {
      if (data.flag) {
        data.data.records.forEach((item: any) => {
          item.articleContent = markdownToHtml(item.articleContent)
            .replace(/<\/?[^>]*>/g, '')
            .replace(/[|]*\n/, '')
            .replace(/&npsp;/gi, '')
        })
        articles.value = data.data.records
      }
    })
}
</script>

<style lang="scss" scoped>
.arco-list-item {
  padding: 4px 10px !important;
}
.comment {
  width: 70%;
}

.commentContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.avatar-img {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 800ms;
  transform: rotate(-360deg);
}

.avatar-img:hover {
  transform: rotate(360deg);
}
</style>
  