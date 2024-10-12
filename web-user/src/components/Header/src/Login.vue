<template>
  <!--登录对话框-->
  <a-modal v-model:visible="loginDialogVisible" title="登录" width="30%" draggable :footer="false">
    <a-form :model="loginInfo" @submit="login" @keyup.enter="login">
      <a-form-item field="username" label="邮箱">
        <a-input v-model="loginInfo.username" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item field="password" label="密码">
        <a-input v-model="loginInfo.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">登录</a-button>
      </a-form-item>
      <div class="mt-8">
        <span class="text" @click="openRegisterDialog">立即注册</span>
        <span class="text float-right" @click="openForgetPasswordDialog">忘记密码?</span>
      </div>
    </a-form>
  </a-modal>
  <!--注册对话框-->
  <a-modal v-model:visible="registerDialogVisible" title="注册" width="30%" draggable :footer="false">
    <a-form :model="loginInfo" @submit="register" @keyup.enter="register">
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
      <a-form-item field="password" label="密码">
        <a-input v-model="loginInfo.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">注册</a-button>
      </a-form-item>
      <div class="mt-8">
        <span class="text float-right" @click="returnLoginDialog">已有帐号?登录</span>
      </div>
    </a-form>
  </a-modal>
  <!--忘记密码对话框-->
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

<script lang="ts" setup>
import {
  reactive,
  getCurrentInstance,
  toRef,
  onMounted,
  defineProps,
  watch,
  ref
} from 'vue'
import { useCommonStore } from '@/stores/common'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import api from '@/api/api'
import config from '@/settings.ts'

const proxy: any = getCurrentInstance()?.appContext.config.globalProperties
const commonStore = useCommonStore()
const userStore = useUserStore()
const route = useRoute()
const articlePassword = ref('')
const articleId = ref('')
const loginInfo = reactive({
  code: '',
  username: '',
  password: ''
})
const registerDialogVisible = ref(false)
const forgetPasswordDialogVisible = ref(false)
const loginDialogVisible = ref(false)
const isMobile = toRef(commonStore.$state, 'isMobile')

// 在 `props` 函数中声明 `props`
const props = defineProps({
  show: Boolean
})

onMounted(() => {
  console.log('是否显示' + props.show)
})

watch(() => props.show, (newValue, oldValue) => {
  loginDialogVisible.value = newValue
})

const returnLoginDialog = () => {
  registerDialogVisible.value = false
  forgetPasswordDialogVisible.value = false
  loginDialogVisible.value = true
}

const register = () => {
  let params = {
    code: loginInfo.code,
    username: loginInfo.username,
    password: loginInfo.password
  }
  api.register(params).then(({ data }) => {
    if (data.flag) {
      proxy.$notify({
        title: 'Success',
        message: '注册成功',
        type: 'success'
      })
      registerDialogVisible.value = false
      loginDialogVisible.value = true
    } else {
      proxy.$notify({
        title: 'Error',
        message: data.message,
        type: 'error'
      })
    }
  })
}

const qqLogin = () => {
  userStore.currentUrl = route.path
  loginDialogVisible.value = false
  if (commonStore.isMobile) {
    //@ts-ignore
    QC.Login.showPopup({
      appId: config.qqLogin.QQ_APP_ID,
      redirectURI: config.qqLogin.QQ_REDIRECT_URI
    })
  } else {
    window.open(
      'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=' +
      +config.qqLogin.QQ_APP_ID +
      '&response_type=token&scope=all&redirect_uri=' +
      config.qqLogin.QQ_REDIRECT_URI,
      '_self'
    )
  }
}

const updatePassword = () => {
  api.updatePassword(loginInfo).then(({ data }) => {
    if (data.flag) {
      proxy.$notify({
        title: 'Success',
        message: '修改成功',
        type: 'success'
      })
      forgetPasswordDialogVisible.value = false
      loginDialogVisible.value = true
    } else {
      proxy.$notify({
        title: 'Error',
        message: data.message,
        type: 'error'
      })
    }
  })
}


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

const openRegisterDialog = () => {
  loginDialogVisible.value = false
  registerDialogVisible.value = true
}


const openForgetPasswordDialog = () => {
  loginDialogVisible.value = false
  forgetPasswordDialogVisible.value = true
}


const login = () => {
  if (loginInfo.username.trim().length == 0 || loginInfo.password.trim().length == 0) {
    proxy.$notify({
      title: 'Warning',
      message: '账号或者密码不能为空',
      type: 'warning'
    })
    return
  }
  let params = new URLSearchParams()
  params.append('username', loginInfo.username)
  params.append('password', loginInfo.password)
  api.login(params).then(({ data }) => {
    if (data.flag) {
      userStore.userInfo = data.data
      sessionStorage.setItem('token', data.data.token)
      userStore.token = data.data.token
      proxy.$notify({
        title: 'Success',
        message: '登录成功',
        type: 'success'
      })
      loginDialogVisible.value = false
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


