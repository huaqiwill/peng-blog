import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', {
  state: () => {
    return {
      // 主页的
      homeTags: '' as any,
      // 标签列表
      tags: '' as any
    }
  },
  actions: {}
})
