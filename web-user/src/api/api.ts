import axios from 'axios'
// import { app } from '@/main'
import { Notification } from '@arco-design/web-vue';

/* 请求拦截器 */
axios.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
  return config
})

/* 响应拦截器 */
axios.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      case 50000:
        Notification.error({
          content: '系统异常,请联系管理员~',
        })
        // app.config.globalProperties.$notify({
        //   title: 'Error',
        //   message: '系统异常,请联系管理员',
        //   type: 'error'
        // })
        break
      case 40001:
        Notification.error({
          content: '用户未登录~',
        })
        // app.config.globalProperties.$notify({
        //   title: 'Error',
        //   message: '用户未登录',
        //   type: 'error'
        // })
        break
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default {
  /* 获取推荐文章 */
  getTopAndFeaturedArticles: () => {
    return axios.get('/api/articles/topAndFeatured')
  },
  /* 获取文章列表 */
  getArticles: (params: any) => {
    return axios.get('/api/articles/all', { params: params })
  },
  /* 通过分类ID获取文章 */
  getArticlesByCategoryId: (params: any) => {
    return axios.get('/api/articles/categoryId', { params: params })
  },
  /* 通过ID获取文章 */
  getArticeById: (articleId: any) => {
    return axios.get('/api/articles/' + articleId)
  },
  /* 获取所有分类信息 */
  getAllCategories: () => {
    return axios.get('/api/categories/all')
  },
  /* 获取所有标签信息 */
  getAllTags: () => {
    return axios.get('/api/tags/all')
  },
  /* 获取顶部10个标签 */
  getTopTenTags: () => {
    return axios.get('/api/tags/topTen')
  },
  /*  */
  getArticlesByTagId: (params: any) => {
    return axios.get('/api/articles/tagId', { params: params })
  },
  /*  */
  getAllArchives: (params: any) => {
    return axios.get('/api/archives/all', { params: params })
  },
  /* 登录  */
  login: (params: any) => {
    return axios.post('/api/users/login', params)
  },
  /*  */
  saveComment: (params: any) => {
    return axios.post('/api/comments/save', params)
  },
  /*  */
  getComments: (params: any) => {
    return axios.get('/api/comments', { params: params })
  },
  /*  */
  getTopSixComments: () => {
    return axios.get('/api/comments/topSix')
  },
  /*  */
  getAbout: () => {
    return axios.get('/api/about')
  },
  /*  */
  getFriendLink: () => {
    return axios.get('/api/links')
  },
  /*  */
  submitUserInfo: (params: any) => {
    return axios.put('/api/users/info', params)
  },
  /*  */
  getUserInfoById: (id: any) => {
    return axios.get('/api/users/info/' + id)
  },
  /*  */
  updateUserSubscribe: (params: any) => {
    return axios.put('/api/users/subscribe', params)
  },
  /*  */
  sendValidationCode: (username: any) => {
    return axios.get('/api/users/code', {
      params: {
        username: username
      }
    })
  },
  /*  */
  bindingEmail: (params: any) => {
    return axios.put('/api/users/email', params)
  },
  /* 注册 */
  register: (params: any) => {
    return axios.post('/api/users/register', params)
  },
  /* 搜索归档 */
  searchArticles: (params: any) => {
    return axios.get('/api/articles/search', {
      params: params
    })
  },
  /* 获取照片专辑 */
  getAlbums: () => {
    return axios.get('/api/photos/albums')
  },
  /*  */
  getPhotosBuAlbumId: (albumId: any, params: any) => {
    return axios.get('/api/albums/' + albumId + '/photos', {
      params: params
    })
  },
  /* 获取网站配置 */
  getWebsiteConfig: () => {
    return axios.get('/api')
  },
  /* QQ登录 */
  qqLogin: (params: any) => {
    return axios.post('/api/users/oauth/qq', params)
  },
  /*  */
  report: () => {
    axios.post('/api/report')
  },
  /* 获取Talk列表 */
  getTalks: (params: any) => {
    return axios.get('/api/talks', {
      params: params
    })
  },
  /* 通过id获取Talk */
  getTalkById: (id: any) => {
    return axios.get('/api/talks/' + id)
  },
  /* 登出 */
  logout: () => {
    return axios.post('/api/users/logout')
  },
  /*  */
  getRepliesByCommentId: (commentId: any) => {
    return axios.get(`/api/comments/${commentId}/replies`)
  },
  /* 修改密码 */
  updatePassword: (params: any) => {
    return axios.put('/api/users/password', params)
  },
  /* 访问文章 */
  accessArticle: (params: any) => {
    return axios.post('/api/articles/access', params)
  }
}
