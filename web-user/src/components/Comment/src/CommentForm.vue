
<template>
  <div class="flex space-x-3 xl:space-x-5">
    <div class="comment flex flex-col flex-wrap-reverse w-full max-w-full-calc">
      <a-textarea v-model="commentContent" class="w-full" placeholder="输入评论内容" cols="30" rows="5" allow-clear />
      <div class="justify-between" style="text-align: right">
        <a-button
          @click="saveComment"
          type="primary"
          id="submit-button"
          class="mt-5 w-32 text-white p-2 transition transform hover:scale-105 flex float-right">
          <span class="text-center flex-grow commit">发布评论</span>
        </a-button>
      </div>
      <div class="w-full border-b-2 mt-6 wire"></div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：评论区表单
 */
import { defineComponent, toRefs, reactive, getCurrentInstance, computed } from 'vue'
import { SubTitle } from '@/components/Title'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { useCommentStore } from '@/stores/comment'
import { useAppStore } from '@/stores/app'
import api from '@/api/api'
import emitter from '@/utils/mitt'
import { Notification } from '@arco-design/web-vue'

export default defineComponent({
  name: 'CommentItem',
  components: { SubTitle },
  setup() {
    const proxy: any = getCurrentInstance()?.appContext.config.globalProperties

    const userStore = useUserStore()
    const commentStore = useCommentStore()
    const appStore = useAppStore()
    const route = useRoute()
    const reactiveData = reactive({
      commentContent: '' as any
    })
    const saveComment = () => {
      if (userStore.userInfo === '') {
        Notification.warning({
          content: '请登录后评论'
        })
        // proxy.$notify({
        //   title: 'Warning',
        //   message: '请登录后评论',
        //   type: 'warning'
        // })
        return
      }
      if (reactiveData.commentContent.trim() == '') {
        Notification.warning({
          content: '评论不能为空'
        })

        // proxy.$notify({
        //   title: 'Warning',
        //   message: '评论不能为空',
        //   type: 'warning'
        // })
        return
      }
      const path = route.path
      const arr = path.split('/')
      const params: any = {
        commentContent: reactiveData.commentContent,
        type: commentStore.type
      }
      params.topicId = arr[2]
      api.saveComment(params).then(({ data }) => {
        if (data.flag) {
          fetchComments()
          let isCommentReview = appStore.websiteConfig.isCommentReview
          if (isCommentReview) {
            Notification.info({
              content: '评论成功,正在审核中'
            })
            // proxy.$notify({
            //   title: 'Warning',
            //   message: '评论成功,正在审核中',
            //   type: 'warning'
            // })
          } else {
            Notification.success({
              content: '评论成功'
            })
            // proxy.$notify({
            //   title: 'Success',
            //   message: '评论成功',
            //   type: 'success'
            // })
          }
          reactiveData.commentContent = ''
        } else {
          Notification.error({
            content: data.message
          })
          // proxy.$notify({
          //   title: 'Error',
          //   message: data.message,
          //   type: 'error'
          // })
        }
      })
    }
    const fetchComments = () => {
      switch (commentStore.type) {
        case 1:
          emitter.emit('articleFetchComment')
          break
        case 2:
          emitter.emit('messageFetchComment')
          break
        case 3:
          emitter.emit('aboutFetchComment')
          break
        case 4:
          emitter.emit('friendLinkFetchComment')
          break
        case 5:
          emitter.emit('talkFetchComment')
      }
    }
    return {
      ...toRefs(reactiveData),
      avatar: computed(() => userStore.userInfo.avatar),
      saveComment
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  background: var(--background-primary);
  resize: none;
}

#submit-button {
  outline: none;
  background: #165dff;
}

.wire {
  border-color: var(--text-normal);
}
</style>
