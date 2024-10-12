import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      // 当前url
      currentUrl: '' as any,
      // 用户是否可见
      userVisible: false,
      // 用户信息
      userInfo: '' as any,
      //
      token: '' as any,
      //
      accessArticles: [] as any,
      //
      tab: 0 as any,
      //
      page: 1 as any
    }
  },
  actions: {},
  persist: {
    storage: window.sessionStorage
  }
})
