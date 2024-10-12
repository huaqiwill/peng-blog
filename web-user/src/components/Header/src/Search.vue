<template>
  <div class="menu-demo ">
    <a-input-search :style="{ width: '320px' }" placeholder="Search" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent } from 'vue'

const text = ref('')
</script>

<style lang="scss" scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
}
</style>