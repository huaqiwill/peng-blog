<template>
  <ul class="px-5 flex flex-wrap space-x-4">
    <li class="px-15 py-15 w-1/6 h-auto" v-for="item in albums" :key="item.id">
      <a-image :title="item.albumName" :description="item.albumDesc" footer-position="outer" width="200"
               :src="item.albumCover" :preview-visible="visible2"
               @preview-visible-change="() => { visible2 = false }" @click="pushPage(`/photos/${item.id}`)">
        <template #extra>
          <div class="actions">
            <span class="action" @click="() => { visible2 = true }">查看</span>
            <span class="action">下载</span>
            <a-tooltip content="item.albumName">
              <span class="action">点赞</span>
            </a-tooltip>
          </div>
        </template>
      </a-image>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs, ref } from 'vue'
import api from '@/api/api'
import { useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate'

const router = useRouter()
const albums = ref([])
const visible2 = ref(false)

onMounted(() => {
  fetchList()
})

// pushPage
const pushPage = (path: string): void => {
  if (!path) return
  if (isExternal(path)) {
    window.location.href = path
  } else {
    router.push({
      path: path
    })
  }
}

const fetchList = () => {
  api.getAlbums().then(({ data }) => {
    albums.value = data.data
    console.log(albums.value)
  })
}
</script>
