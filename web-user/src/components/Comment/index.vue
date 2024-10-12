<template>
  <div class="bg-ob-deep-800 p-4 mt-4 lg:px-4 lg:py-4 rounded shadow mb-4 lg:mb-0" id="comments">
    <CommentForm />
    <CommentList />
  </div>
</template>
<script lang="ts">
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：评论区
 */
import { defineComponent } from 'vue'
import CommentForm from './src/CommentForm.vue'
import CommentList from './src/CommentList.vue'

export default defineComponent({
  name: 'Comment',
  components: {
    CommentForm,
    CommentList
  },
  setup() {
    return {}
  }
})
</script>
