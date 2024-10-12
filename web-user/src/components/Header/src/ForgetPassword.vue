<template>
  <a-modal title="忘记密码" v-model:visible="forgetPasswordDialogVisible" width="30%" draggable :footer="false">
    <a-form :model="loginInfo" @submit="updatePassword" @keyup.enter="updatePassword">
      <a-form-item field="username" label="邮箱">
        <a-input v-model="loginInfo.username" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item field="code" label="验证码">
        <a-input v-model="loginInfo.code" placeholder="请输入验证码">
          <template #append>
            <span class="text" @click="sendCode">发送</span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" label="新密码">
        <a-input v-model="loginInfo.password" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">确定</a-button>
      </a-form-item>
      <div class="mt-8">
        <span class="text" @click="returnLoginDialog">返回登录</span>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { reactive, defineComponent, getCurrentInstance, toRefs, toRef } from 'vue'
import { useCommonStore } from '@/stores/common'
import { useUserStore } from '@/stores/user'
import api from '@/api/api'

export default defineComponent({
  name: 'ForgetPassword',
  setup() {
    const proxy: any = getCurrentInstance()?.appContext.config.globalProperties
    const commonStore = useCommonStore()
    const userStore = useUserStore()

    const reactiveDate = reactive({
      loginDialogVisible: false,
      registerDialogVisible: false,
      forgetPasswordDialogVisible: false,
      articlePasswordDialogVisible: false,
      articlePassword: '',
      articleId: ''
    })

    const loginInfo = reactive({
      code: '',
      username: '',
      password: ''
    })

    const sendCode = () => {
      api.sendValidationCode(loginInfo.username).then(({ data }) => {
        if (data.flag) {
          proxy.$notify({
            title: 'Success',
            message: '验证码已发送',
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

    const updatePassword = () => {
      api.updatePassword(loginInfo).then(({ data }) => {
        if (data.flag) {
          proxy.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success'
          })
          reactiveDate.forgetPasswordDialogVisible = false
          reactiveDate.loginDialogVisible = true
        } else {
          proxy.$notify({
            title: 'Error',
            message: data.message,
            type: 'error'
          })
        }
      })
    }

    const returnLoginDialog = () => {
      reactiveDate.registerDialogVisible = false
      reactiveDate.forgetPasswordDialogVisible = false
      reactiveDate.loginDialogVisible = true
    }

    return {
      ...toRefs(reactiveDate),
      isMobile: toRef(commonStore.$state, 'isMobile'),
      loginInfo,
      sendCode,
      updatePassword,
      returnLoginDialog
    }
  }
})
</script>
