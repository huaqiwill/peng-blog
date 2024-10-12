<template>
  <div>
     <Breadcrumb :current="t('menu.album')" />
    <div class="flex flex-col">
      <!-- 中间 -->
      <div class="relative">
        <a-card class="">
          <div class="post-header">
            <h1 v-if="photoAlbumName != ''" class="post-title text-black uppercase">{{ photoAlbumName }}</h1>
          </div>
          <div class="">
            <div
              class="list-lis"
              v-infinite-scroll="loadDataFromServer"
              :infinite-scroll-immediate-check="false"
              :infinite-scroll-disabled="noResult"
              infinite-scroll-watch-disabled="scrollDisabled"
              :infinite-scroll-distance="isMobile ? 0 : 30">
              <div class="photo-wrap">
                <img
                  v-for="(item, index) of photos"
                  class="photo"
                  :key="index"
                  :src="item"
                  @click="handlePreview(index)" />
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineComponent, reactive, toRefs, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/stores/common'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { Sidebar, Profile } from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { v3ImgPreviewFn } from 'v3-img-preview'
import api from '@/api/api'

const { t } = useI18n()
const route = useRoute()
const commonStore = useCommonStore()

const photoAlbumName = ref('')
const noResult = ref(false)
const photos = ref([])
const current = ref(1)
const size = ref(10)
const albumId = ref(route.params.albumId)

onBeforeRouteUpdate((to) => {
  photoAlbumName.value = ''
  photos.value = []
  noResult.value = false
  current.value = 1
  albumId.value = to.params.albumId
  loadDataFromServer()
})

const handlePreview = (index: any) => {
  v3ImgPreviewFn({ images: photos.value, index })
}

const loadDataFromServer = () => {
  api.getPhotosBuAlbumId(albumId.value, {
    current: current.value,
    size: size.value
  }).then(({ data }) => {
    console.log(data)
    let photos_ = data.data.photos
    let name_ = data.data.photoAlbumName
    if (photos_.length > 0) {
      current.value++
      photoAlbumName.value = name_
      photos.value = photos_
    } else {
      noResult.value = true
    }
  })
}
</script>

<style lang="scss" scoped>
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
}

.photo {
  margin: 3px;
  cursor: pointer;
  flex-grow: 1;
  object-fit: cover;
  height: 200px;
}

.photo-wrap::after {
  content: '';
  display: block;
  flex-grow: 9999;
}

@media (max-width: 759px) {
  .photo {
    width: 100%;
  }
}
</style>
