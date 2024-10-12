import { defineStore } from 'pinia'

export const useMetaStore = defineStore('metaStore', {
  state: () => {
    return {
      // 网站标题
      title: '冰冰符号的个人博客'
    }
  }
})
