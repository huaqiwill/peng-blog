<template>
  <div class="main-grid">
    <Sidebar>
      <!-- 最新文章 -->
      <RecentArticle />
      <!-- 账户信息 -->
      <Profile />
      <!-- 公告 -->
      <Notice />
      <!-- 网站信息 -->
      <WebsiteInfo />
      <!-- 今日热搜 -->
      <TodaySearch />
      <!-- 最近评论 -->
      <RecentComment v-if="true" />
      <!-- 标签目录 -->
      <TagBox />
    </Sidebar>
    <a-tabs default-active-key="0">
      <a-tab-pane v-for="(category, index) in categories" :title="category.categoryName" :key="index">
        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
          <li v-for="(article, index) in articles" :key="index">
            <ArticleCard class="home-article" :data="article" />
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
/**
 * 文件名：index.vue
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：主页
 */
import { computed, onMounted, ref, toRef, reactive, Ref } from 'vue'
import { ArticleCard } from '@/components/ArticleCard'
import {
  Sidebar,
  Profile,
  RecentComment,
  RecentArticle,
  TodaySearch,
  TagBox,
  Notice,
  WebsiteInfo
} from '@/components/Sidebar'
import Paginator from '@/components/Paginator.vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'
import { useCategoryStore } from '@/stores/category'
import { useI18n } from 'vue-i18n'
import api from '@/api/api'
import markdownToHtml from '@/utils/markdown'
import { Article, Category } from '@/types'

// 定义 Category 对象的属性
// interface Category {
//   id: number
//   categoryName: string
//   articleCount: number
// }

const appStore = useAppStore()
const userStore = useUserStore()
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const { t } = useI18n()

const expanderClass = ref({
  'tab-expander': true,
  expanded: false
})

const tabClass = ref({
  tab: true,
  'expanded-tab': false
})

const activeTab = ref(0)
const articleOffset = ref(0)
const haveArticles = ref(false)
const pagination = reactive({
  size: 12,
  total: 0,
  current: 1
})
let nowCategoryId = 0

/* 被挂载到DOM后执行逻辑 */
onMounted(() => {
  fetchTopAndFeatured()
  fetchCategories()
  fetchArticles()
  const articleListEl = document.getElementById('article-list')
  articleOffset.value = articleListEl && articleListEl instanceof HTMLElement ? articleListEl.offsetTop + 120 : 0
})

const fetchTopAndFeatured = () => {
  api.getTopAndFeaturedArticles().then(({ data }) => {
    data.data.topArticle.articleContent = markdownToHtml(data.data.topArticle.articleContent)
      .replace(/<\/?[^>]*>/g, '')
      .replace(/[|]*\n/, '')
      .replace(/&npsp;/gi, '')
    data.data.featuredArticles.forEach((item: any) => {
      item.articleContent = markdownToHtml(item.articleContent)
        .replace(/<\/?[^>]*>/g, '')
        .replace(/[|]*\n/, '')
        .replace(/&npsp;/gi, '')
    })
    articleStore.topArticle = data.data.topArticle
    articleStore.featuredArticles = data.data.featuredArticles
  })
}

const articles: Ref<Article[]> = ref([])

const fetchArticles = () => {
  activeTab.value = userStore.tab
  nowCategoryId = userStore.tab
  pagination.current = userStore.page
  if (userStore.tab === 0) {
    haveArticles.value = false
    api
      .getArticles({
        current: pagination.current,
        size: pagination.size
      })
      .then(({ data }) => {
        if (data.flag) {
          data.data.records.forEach((item: any) => {
            item.articleContent = markdownToHtml(item.articleContent)
              .replace(/<\/?[^>]*>/g, '')
              .replace(/[|]*\n/, '')
              .replace(/&npsp;/gi, '')
          })
          articleStore.articles = data.data.records
          pagination.total = data.data.count
          haveArticles.value = true
          articles.value = articleStore.articles
        }
      })
  } else {
    fetchArticlesByCategoryId(userStore.tab)
  }
}

const fetchArticlesByCategoryId = (categoryId: any) => {
  haveArticles.value = false
  api
    .getArticlesByCategoryId({
      current: pagination.current,
      size: pagination.size,
      categoryId: categoryId
    })
    .then(({ data }) => {
      data.data.records.forEach((item: any) => {
        item.articleContent = markdownToHtml(item.articleContent)
          .replace(/<\/?[^>]*>/g, '')
          .replace(/[|]*\n/, '')
          .replace(/&npsp;/gi, '')
      })
      articleStore.articles = data.data.records
      pagination.total = data.data.count
      haveArticles.value = true
    })
}

const fetchCategories = () => {
  categoryStore.categories = []
  api.getAllCategories().then(({ data }) => {
    categoryStore.categories.push(...data.data)
  })
}

const expandHandler = () => {
  expanderClass.value.expanded = !expanderClass.value.expanded
  tabClass.value['expanded-tab'] = !tabClass.value['expanded-tab']
}

const handleTabChange = (categoryId: any) => {
  userStore.tab = categoryId
  userStore.page = 1
  pagination.current = 1
  activeTab.value = categoryId
  nowCategoryId = categoryId
  toArticleOffset()
  if (categoryId === 0) {
    fetchArticles()
  } else {
    fetchArticlesByCategoryId(categoryId)
  }
}

const toArticleOffset = () => {
  window.scrollTo({
    top: articleOffset.value
  })
}

/* 激活时候Tab的样式 */
const activeTabStyle = (categoryId: any) => {
  if (categoryId === activeTab.value)
    return {
      // background: appStore.themeConfig.header_gradient_css
      background: '#165dff'
    }
  return {}
}

const pageChangeHanlder = (current: number) => {
  userStore.page = current
  pagination.current = current
  toArticleOffset()
  if (nowCategoryId === 0) {
    fetchArticles()
  } else {
    fetchArticlesByCategoryId(nowCategoryId)
  }
}

const gradientText = computed(() => appStore.themeConfig.background_gradient_style)
const gradientBackground = computed(() => {
  return { background: appStore.themeConfig.header_gradient_css }
})
const themeConfig = computed(() => appStore.themeConfig)

const categories: Ref<Category[]> = toRef(categoryStore.$state, 'categories')
</script>

<style lang="scss">
.home-article {
  .article-content {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .article-footer {
      margin-top: 13px;
    }
  }
}
</style>
