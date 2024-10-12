import { defineStore } from 'pinia'
import { i18n } from '@/assets/locales'
import cookies from 'js-cookie'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 进度条
nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  parent: '#loading-bar-wrapper'
})

// 设置主题
const setTheme = (theme: string) => {
  if (theme === 'theme-dark') {
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
  } else {
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
  }
}

const theme = cookies.get('theme') ? String(cookies.get('theme')) : 'theme-light'

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      // 主题
      themeConfig: {
        theme,
        profile_shape: 'circle-avatar',
        feature: true,
        gradient: {
          color_1: '#24c6dc',
          color_2: '#5433ff',
          color_3: '#ff0099'
        },
        header_gradient_css: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
        background_gradient_style: {
          background: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          '-webkit-box-decoration-break': 'clone',
          'box-decoration-break': 'clone'
        }
      },
      // 应用加载中
      appLoading: false,
      // 网站配置
      websiteConfig: '' as any,
      // 访客数
      viewCount: 0,
      // 文章数
      articleCount: 0,
      // 说说数
      talkCount: 0,
      // 分类数
      categoryCount: 0,
      // 标签数
      tagCount: 0,
      //
      NPTimeout: -1,
      //
      loadingTimeout: -1,
      // 是否启用机器人
      aurora_bot_enable: true
    }
  },
  actions: {
    // 切换语言
    changeLocale(locale: string) {
      cookies.set('locale', locale, { expires: 7 })
      i18n.global.locale = locale
    },
    // 初始化子主题
    initializeTheme(mode: string) {
      setTheme(mode)
    },
    // 切换主题
    toggleTheme(isDark?: boolean) {
      this.themeConfig.theme =
        isDark === true || this.themeConfig.theme === 'theme-light' ? 'theme-dark' : 'theme-light'
      cookies.set('theme', this.themeConfig.theme, { expires: 7 })
      setTheme(this.themeConfig.theme)
    },
    // 开始加载
    startLoading() {
      if (this.appLoading === true) return
      if (this.NPTimeout !== -1) clearTimeout(this.NPTimeout)
      if (this.loadingTimeout !== -1) clearTimeout(this.loadingTimeout)
      nProgress.start()
      this.appLoading = true
    },
    // 结束加载
    endLoading() {
      this.NPTimeout = <any>setTimeout(() => {
        nProgress.done()
      }, 100)

      this.loadingTimeout = <any>setTimeout(() => {
        this.appLoading = false
      }, 300)
    }
  }
})
