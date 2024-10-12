import { defineStore } from 'pinia'
import { Category } from '@/types'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      // 分类列表
      categories: [] as Category[]
    }
  },
  actions: {}
})
