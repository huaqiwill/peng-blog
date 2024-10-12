

<script lang="ts">
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：
*/
import { defineComponent } from 'vue'
import HorizontalArticle from '@/components/ArticleCard/src/HorizontalArticle.vue'

export default defineComponent({
  name: 'Feature',
  components: { HorizontalArticle },
  setup() {
    return {}
  }
})
</script>
<template>
  <div id="feature">
    <horizontal-article class="home-horizontal-article" />
    <slot />
  </div>
</template>
<style lang="scss">
.home-horizontal-article {
  .feature-content {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
