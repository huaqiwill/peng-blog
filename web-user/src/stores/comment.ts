import { defineStore } from 'pinia'

export const useCommentStore = defineStore('commentStore', {
  state: () => {
    return {
      // 最近评论
      recentComment: '' as any,
      // 评论类型
      type: '' as any
    }
  },
  actions: {}
})
