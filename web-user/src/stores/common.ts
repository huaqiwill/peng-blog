import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: () => {
    return {
      // 是否为移动端
      isMobile: false,
      // 头部图片
      headerImage: ''
    }
  },
  actions: {
    // 切换为移动端状态
    changeMobileState(isMobile: boolean) {
      this.isMobile = isMobile
    },
    // 设置头部图片
    setHeaderImage(imageUrl: string) {
      this.headerImage = imageUrl
    },
    // 重置头部图片
    resetHeaderImage() {
      this.headerImage = ''
    }
  }
})
