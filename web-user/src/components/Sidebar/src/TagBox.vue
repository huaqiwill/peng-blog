<template>
  <a-card class="mb-4">
    <SubTitle :title="'titles.tag_list'" icon="tag" />

    <TagList>
      <template v-if="tags != '' && tags.length > 0">
        <a-tag color="gray" v-for="tag in tags" :key="tag.id" class="m-1" checkable >
          <template #icon>
            <icon-github />
          </template>
          {{ tag.tagName + ' * ' + tag.count }}
        </a-tag>

        <!--        <TagItem v-for="tag in tags" :key="tag.id" :id="tag.id" :name="tag.tagName" :count="tag.count" size="xs" />-->
        <div class="flex flex-row items-center hover:opacity-50 mr-2 mb-2 cursor-pointer transition-all">
          <span class="text-center px-3 py-1 rounded-md text-sm">
            <b class="border-b-2 border-ob hover:text-ob">
              <router-link to="/tags"> {{ t('settings.more-tags') }} ... </router-link>
            </b>
          </span>
        </div>
      </template>
    </TagList>
  </a-card>
</template>

<script lang="ts" setup>
/**
 * 创建日期：2024年04月07日
 * 更新日期：2024年04月07日
 * 描述：
 */
import { defineComponent, onMounted, toRef } from 'vue'
import { SubTitle } from '@/components/Title'
import { useTagStore } from '@/stores/tag'
import { TagList, TagItem } from '@/components/Tag'
import { useI18n } from 'vue-i18n'
import api from '@/api/api'

const tagStore = useTagStore()
const { t } = useI18n()
const tags = toRef(tagStore.$state, 'homeTags')

onMounted(() => {
  fetchTopTenTags()
})

const fetchTopTenTags = () => {
  api.getTopTenTags().then(({ data }) => {
    tagStore.homeTags = data.data
  })
}
</script>


<style lang="scss">
.sidebar-box li.ob-skeleton {
  @apply mr-2 mb-2;
}
</style>
