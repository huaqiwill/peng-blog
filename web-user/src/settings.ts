export default {
  // 默认主题
  theme: 'theme-light',
  // QQ登录信息
  qqLogin: {
    QQ_APP_ID: '101999415',
    QQ_REDIRECT_URI: 'https://www.linhaojun.top/oauth/login/qq'
  },
  // 默认网站标题
  title: '网站标题',
  // 默认路由
  routes: [
    {
      name: 'Home',
      path: '/',
      i18n: {
        cn: '博客',
        en: 'Home'
      },
      children: []
    },
    {
      name: 'Talks',
      path: '/talks',
      i18n: {
        cn: '说说',
        en: 'talks'
      },
      children: []
    },
    {
      name: 'Album',
      path: '/albums',
      i18n: {
        cn: '相册',
        en: 'Album'
      },
      children: []
    },
  ]
}
