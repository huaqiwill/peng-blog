<template>
  <footer class="px-10 py-10 bg-gray-600 text-white">
    <div class="flex flex-wrap justify-start space-x-2">
      <p>帮助与反馈</p>
      <p>在线投稿</p>
      <p>如何赞助</p>
      <p>文章编辑</p>
      <p>热门文章</p>
      <p>留言列表</p>
      <p>会员列表</p>
      <p>网站导航</p>
      <p>用户登录</p>
      <p>友情链接</p>
      <p>关于平台</p>
      <p>用户注册</p>
    </div>
    <hr class="mt-4" />
    <div>
      <p class="mt-5">
        规则之树创建于2017年，由简单的个人技术小站，发展为综合性的文章内容博客，主要分享各类技术教程，互联网评测，原创小说文章等内容。一直以来，我们都在收集知识，创造知识，在互联网的潮流之中努力前行。
        页面执行：2.752 s
      </p>
      <p>规则之树版权所有。湘ICP备16007412号-3</p>
      <p>
        网站部分图片，资源来源于互联网，如侵犯了您的权利，请立即联系邮箱（buxia97@126.com）进行删除。
        网站交流QQ群：1046368621
      </p>
    </div>
    <div class="mt-5">
      友情链接：
      <span>规则之书</span>
      <span>规则之书</span>
      <span>规则之书</span>
      <span>规则之书</span>
      <span>规则之书</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Footer',
  setup() {
    const appStore = useAppStore()
    /* 文本 */
    const { t } = useI18n()
    return {
      /* 头像的类 */
      avatarClass: computed(() => {
        return {
          'footer-avatar': true,
          [appStore.themeConfig.profile_shape]: true
        }
      }),
      /* 渐变文本 */
      gradientText: computed(() => appStore.themeConfig.background_gradient_style),
      /* 渐变背景 */
      gradientBackground: computed(() => {
        return {
          background: appStore.themeConfig.header_gradient_css
        }
      }),
      /* 当前年 */
      currentYear: computed(() => new Date().getUTCFullYear()),
      /* 网站配置 */
      websiteConfig: computed(() => appStore.websiteConfig),
      t
    }
  }
})
</script>
