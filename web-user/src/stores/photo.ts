import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photoStore', {
  state: () => {
    return {
      // 相册是否可见
      photoAlbumVisible: true,
      // 相册列表
      photos: '' as any,
      //
      id: '' as any
    }
  },
  actions: {}
})
