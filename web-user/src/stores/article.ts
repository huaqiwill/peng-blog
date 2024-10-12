import { defineStore } from 'pinia'

export const useArticleStore = defineStore('articleStore', {
  state: () => {
    return {
      // 置顶文章
      topArticle: '' as any,
      // 推荐文章
      featuredArticles: [] as any,
      // 文章列表
      articles: [] as any,
      // 分类列表
      categories: [] as any,
      // 归档列表
      archives: [] as any
    }
  },
  actions: {}
})
