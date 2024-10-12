import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// Vuex
export default new Vuex.Store({
  state: {
    // 是否收缩
    collapse: false,
    // tab列表
    tabList: [{ name: '首页', path: '/' }],
    // 用户信息
    userInfo: null,
    // 用户的菜单
    userMenus: [],
    // 页面状态
    pageState: {
      // 文章列表
      articleList: 1,
      // 分类
      category: 1,
      // 标签
      tag: 1,
      // 评论
      comment: 1,
      //
      talkList: 1,
      //
      user: 1,
      //
      online: 1,
      //
      role: 1,
      //
      quartz: 1,
      //
      friendLink: 1,
      //
      operationLog: 1,
      //
      exceptionLog: 1,
      //
      quartzLog: {
        jobId: -1,
        current: 1
      },
      //
      photo: {
        albumId: -1,
        current: 1
      }
    }
  },
  mutations: {
    // 保存Tab
    saveTab(state, tab) {
      if (state.tabList.findIndex((item) => item.path === tab.path) == -1) {
        state.tabList.push({ name: tab.name, path: tab.path })
      }
    },
    // 移除Tab
    removeTab(state, tab) {
      var index = state.tabList.findIndex((item) => item.name === tab.name)
      state.tabList.splice(index, 1)
    },
    // 重置Tab
    resetTab(state) {
      state.tabList = [{ name: '首页', path: '/' }]
    },
    //
    trigger(state) {
      state.collapse = !state.collapse
    },
    // 登录
    login(state, user) {
      sessionStorage.setItem('token', user.token)
      state.userInfo = user
    },
    // 保存用户菜单
    saveUserMenus(state, userMenus) {
      state.userMenus = userMenus
    },
    // 登出
    logout(state) {
      state.userInfo = null
      sessionStorage.removeItem('token')
      state.userMenus = []
    },
    // 更新用户头像
    updateAvatar(state, avatar) {
      state.userInfo.avatar = avatar
    },
    // 更新用户信息
    updateUserInfo(state, user) {
      state.userInfo.nickname = user.nickname
      state.userInfo.intro = user.intro
      state.userInfo.webSite = user.webSite
    },
    //
    updateArticleListPageState(state, current) {
      state.pageState.articleList = current
    },
    //
    updateCategoryPageState(state, current) {
      state.pageState.category = current
    },
    //
    updateTagPageState(state, current) {
      state.pageState.tag = current
    },
    //
    updateCommentPageState(state, current) {
      state.pageState.comment = current
    },
    //
    updateTalkListPageState(state, current) {
      state.pageState.talkList = current
    },
    //
    updateUserPageState(state, current) {
      state.pageState.user = current
    },
    //
    updateOnlinePageState(state, current) {
      state.pageState.online = current
    },
    //
    updateRolePageState(state, current) {
      state.pageState.role = current
    },
    //
    updateQuartzPageState(state, current) {
      state.pageState.quartz = current
    },
    //
    updateFriendLinkPageState(state, current) {
      state.pageState.friendLink = current
    },
    //
    updateOperationLogPageState(state, current) {
      state.pageState.operationLog = current
    },
    //
    updateExceptionLogPageState(state, current) {
      state.pageState.exceptionLog = current
    },
    //
    updateQuartzLogPageState(state, quartzLog) {
      state.pageState.quartzLog.jobId = quartzLog.jobId
      state.pageState.quartzLog.current = quartzLog.current
    },
    //
    updatePhotoPageState(state, photo) {
      state.pageState.photo.albumId = photo.albumId
      state.pageState.photo.current = photo.current
    }
  },
  plugins: [
    // 持久化插件
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
