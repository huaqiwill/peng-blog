<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, toRefs, toRef, reactive } from 'vue'

export default defineComponent({
  name: "",
  components: {

  },
  setup() {
    
    const title = ref(0)
    const description = ref(0)
    const imageList = ref(0)


  }
})
</script>

<style>
</style>
