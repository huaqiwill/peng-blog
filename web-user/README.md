# 个人博客 - 用户端


## 个人博客系统用户端功能

* 首页
* 说说
* 归档

首页显示

左右结构布局，左侧显示最新文章，个人账户信息，公告，网站信息，今日热搜，最近评论
标签目录

右侧显示文章列表，文章按分类进行排放。

PengBlog-WebUser用户端，使用ArcoDesign进行界面的设计和实现。

## PengBlog-WebUser技术栈


本项目使用了如下依赖进行开发

* markdown-it 文本编辑
* mitt 事件监听工具
* nprogress 头部进度条
* normalize.css 样式表重置
* tocbot 博客目录的视线
* axios 进行网络请求

Markdown编辑器：**markdown-it** [官网](https://markdown-it.docschina.org/)

Vue3官方推荐的事件库：**mitt** [官网](https://www.npmjs.com/package/mitt)

进度条：**nprogress** [官网](https://ricostacruz.com/nprogress/)
，纳米级进度条。具有逼真的细流动画，以说服您的用户正在发生的事情!

样式重置库：**normalize.css** [官网](https://necolas.github.io/normalize.css/)
，一个现代的，html5就绪的替代CSS重置

**tocbot**

博客目录插件

**axios**

* vue-axios

界面设计：arco.design


博客主页
![主页](./doc/images/home.png)

博客详情页
![博客详情页](./doc/images/home.png)



### **Tailwind CSS** [官网]()

## 个人博客系统部署

1、进行网站的部署，使用Docker方式 2、使用原生的部署方式

推荐使用Docker进行部署

### Docker部署

1. 安装Docker
2. 安装Nginx
3. 进行服务的维护

### 直接部署

1. 编译代码
2. 安装Nginx
3. 上传代码至服务器
4. 配置文件
5. 启动服务




