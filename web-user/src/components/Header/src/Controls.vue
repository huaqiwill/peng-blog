<template>
  <div class="flex flex-row">
    <!-- 登录和设置按钮 -->
    <template v-if="userInfo === ''">
      <a-button type="text" @click="openLoginPage">登录</a-button>
      <a-button type="text" @click="openRegisterPage">注册</a-button>
    </template>
    <!-- 头像及下拉菜单 -->
    <template v-if="userInfo !== ''">
      <a-dropdown trigger="hover">
        <div class="flex-shrink-0 mr-2">
          <div class="rounded-full ring-gray-100 overflow-hidden shaodw-lg w-9">
            <img class="avatar-img" :src="userInfo.avatar" alt="" />
          </div>
        </div>
        <template #content>
          <a-doption @click="openUserCenter">{{ t('settings.personal-center') }}</a-doption>
          <a-doption @click="logout">{{ t('settings.logout') }}</a-doption>
        </template>
      </a-dropdown>
    </template>
    <!-- 主题切换 -->
    <!-- <span no-hover-effect class="ob-drop-shadow" data-dia="light-switch">
      <ThemeToggle />
    </span> -->
  </div>

  <!--登录对话框-->
  <Login :show="loginDialogVisible" />

  <!-- 文章密码对话框 -->
  <ArticlePassword />

  <!-- 设置对话框 -->
  <Setting />

  <!-- 搜索 -->
  <!-- <teleport to="body">
    <SearchModel />
  </teleport> -->
</template>

<script lang="ts" setup>
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：个人中心
 */
import { computed, ref, toRef, getCurrentInstance, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCommonStore } from '@/stores/common'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useI18n } from 'vue-i18n'
import api from '@/api/api'
import emitter from '@/utils/mitt'
import Login from '@/components/Header/src/Login.vue'
import ArticlePassword from '@/components/Header/src/ArticlePassword.vue'
import Setting from '@/components/Header/src/Setting.vue'

const { t } = useI18n()
const proxy: any = getCurrentInstance()?.appContext.config.globalProperties
const appStore = useAppStore()
const commonStore = useCommonStore()
const userStore = useUserStore()
const searchStore = useSearchStore()
const route = useRoute()
const router = useRouter()

const loginDialogVisible = ref(false)
const articlePasswordDialogVisible = ref(false)
const settingDialogVisible = ref(false)
const articlePassword = ref('')
const articleId = ref('')

emitter.on('changeArticlePasswordDialogVisible', (articleId_: any) => {
  articlePasswordDialogVisible.value = true
  articlePassword.value = ''
  articleId.value = articleId_
  nextTick(() => {
    document.getElementById('article-password-input')?.focus()
  })
})
const handleClick = (name: string): void => {
  appStore.changeLocale(name)
}

const logout = () => {
  api.logout().then(({ data }) => {
    if (data.flag) {
      userStore.userInfo = ''
      userStore.token = ''
      userStore.accessArticles = []
      sessionStorage.removeItem('token')
      proxy.$notify({
        title: 'Success',
        message: '登出成功',
        type: 'success'
      })
    } else {
      proxy.$notify({
        title: 'Error',
        message: data.message,
        type: 'error'
      })
    }
  })
}

const openRegisterPage = () => {
  router.push('/auth/signup')
  // settingDialogVisible.value = true
}

const openUserCenter = () => {
  userStore.userVisible = true
}

const handleOpenModel: any = (status: boolean) => {
  searchStore.setOpenModal(status)
}

const openLoginPage = () => {
  router.push('/auth/signin')
  // loginDialogVisible.value = true
}

const userInfo = toRef(userStore.$state, 'userInfo')
const isMobile = toRef(commonStore.$state, 'isMobile')
const multiLanguage = computed(() => {
  return appStore.websiteConfig.multiLanguage
})
</script>

