# 我的个人博客系统服务端 Huaqiwill

## 前言

- 开源不易，希望大家star支持一下
- 由于本人还在上学，主语言并不是Java，所以项目更新频率较慢，但是本项目会长期维护，有问题可以提issue，
  同时也欢迎大家来共建此项目，包括但不限于：bug 修复、代码优化、功能开发等等

## 技术架构

服务端：https://github.com/huaqiwill/PengBlog-Server

用户前台：https://github.com/huaqiwill/PengBlog-WebUser

用户后台：https://github.com/huaqiwill/PengBlog-WebAdmin

服务端技术选择

* SpringBoot + MyBatisPlus + Redis + RabbitMQ + Quartz + Elasticsearch + MinIO + SpringSecurity
* 测试工具：Junit5 + Mockito + MockMvc + Swagger2 + MybatisPlus-Generator

数据库工具使用：MybatisPlus
定时任务：使用Quartz
进行分布式文件存储：使用MinIO，或者第三方云存储
进行全文检索工具：使用MySQL

## 功能分析

* 文章管理
* 网站信息管理
* 分类管理
* 评论管理
* 异常日志管理
* 友情链接管理
* 定时任务管理
* 定时任务日志管理
* 菜单管理
* 操作日志管理
* 相册管理
* 照片管理
* 资源管理
* 角色管理
* 标签管理
* 用户认证管理
* 用户信息管理

## 在线地址

- 前台链接：[www.bingbingfuhao.cn](http://www.bingbingfuhao.cn)
- 后台链接：[admin.bingbingfuhao.cn](http://admin.bingbingfuhao.cn)
- 演示账号：test@163.com，密码：123456

## 效果图

### 图片1：

### 图片2：

## 相关技术

### 前端：

- 样式来自于：[hexo的aurora主题](https://github.com/auroral-ui/hexo-theme-aurora)
- 基础框架：vue3(前台) vue2(后台)
- 状态管理：pinia(前台) vuex(后台)
- 路由组件：vue-router
- 网络请求：axios
- 其他技术：详见前端项目的package.json

### 后端：

- 基础框架：springboot
- ORM框架：mybatisplus
- 权限框架：springsecurity
- 缓存中间件：redis
- 消息中间件：rabbitmq
- 搜索引擎：elasticsearch
- 对象存储：minio
- 定时任务：quartz
- 其他技术：详见后端项目的pom.xml

## 后续计划

- [ ] 前台代码优化
- [ ] 后台vue3重构
- [ ] 后端提供轻量化选择

## 部署

- 详见项目部署文档

## 交流群

- QQ群：338371628

## 鸣谢

- 感谢[jetbrains](https://www.jetbrains.com/)提供的开源开发许可证
