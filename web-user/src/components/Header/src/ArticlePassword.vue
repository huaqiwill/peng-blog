<template>
  <a-modal title="文章密码" v-model:visible="articlePasswordDialogVisible" width="30%" draggable :footer="false">
    <a-form @submit.prevent @keyup.enter="accessArticle">
      <a-form-item field="articlePassword" label="密码">
        <a-input v-model="articlePassword" placeholder="文章受密码保护,请输入密码" />
      </a-form-item>
      <a-form-item>
        <el-button type="primary" @click="accessArticle" size="large" class="mx-auto mt-3">校验密码</el-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import api from '@/api/api'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const articlePasswordDialogVisible = ref(false)
const isMobile = ref(false)
const articlePassword = ref('')
const proxy: any = getCurrentInstance()?.appContext.config.globalProperties
const route = useRoute()
const articleId = ref('')
const userStore = useUserStore()
const router = useRouter()

const accessArticle = () => {
  if (articlePassword.value.trim().length == 0) {
    proxy.$notify({
      title: 'Warning',
      message: '密码不能为空',
      type: 'warning'
    })
    return
  }
  api
    .accessArticle({
      articleId: articleId,
      articlePassword: articlePassword
    })
    .then(({ data }) => {
      if (data.flag) {
        articlePasswordDialogVisible.value = false
        userStore.accessArticles.push(articleId)
        router.push({ path: '/articles/' + articleId })
      } else {
        proxy.$notify({
          title: 'Error',
          message: data.message,
          type: 'error'
        })
      }
    })
}
</script>
