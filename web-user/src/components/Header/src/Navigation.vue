<template>
  <div class="menu-demo">
    <a-menu mode="horizontal" :default-selected-keys="[1]">
      <a-menu-item key="menu" class="nav-item" disabled>
        <Logo />
      </a-menu-item>
      <a-menu-item v-for="(route, index) in routes" :key="index + 1" @click="pushPage(route.path)"
        >{{ route.i18n.cn }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { isExternal } from '@/utils/validate'
import config from '@/settings.ts'
import api from '@/api/api'
import Logo from '@/components/Header/src/Logo.vue'

const { t } = useI18n()
const router = useRouter()
const routes = config.routes

//
const reactiveData = reactive({
  albums: [] as any
})

// Mounted
onMounted(() => {
  api.getAlbums().then(({ data }) => {
    reactiveData.albums = data.data
  })
})

// 跳转到指定页面
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

// 打开相册
const openPhotoAlbum = (id: any): void => {
  router.push('/photos/' + id)
}
</script>

<style lang="scss" scoped>
.nav-item {
  padding: 0;
  margin-right: 38px;
}
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  // padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>