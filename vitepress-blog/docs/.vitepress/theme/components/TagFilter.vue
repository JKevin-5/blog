<template>
  <div class="tag-filter">
    <div class="tag-filter-header">
      <h3>Filter by Tags</h3>
      <n-button
        v-if="selectedTags.length > 0"
        size="small"
        @click="clearAllTags"
        type="tertiary"
      >
        Clear All
      </n-button>
    </div>
    
    <div class="popular-tags">
      <n-space>
        <n-tag
          v-for="tag in popularTags"
          :key="tag.name"
          :type="getTagType(tag.name)"
          :bordered="false"
          checkable
          @click="toggleTag(tag.name)"
          size="medium"
        >
          {{ tag.name }}
          <template #suffix>
            <span class="tag-count">{{ tag.count }}</span>
          </template>
        </n-tag>
      </n-space>
    </div>

    <n-collapse v-if="allTags.length > popularTags.length">
      <n-collapse-item title="Show All Tags" name="all-tags">
        <n-space>
          <n-tag
            v-for="tag in otherTags"
            :key="tag.name"
            :type="getTagType(tag.name)"
            :bordered="false"
            checkable
            @click="toggleTag(tag.name)"
            size="small"
          >
            {{ tag.name }}
            <template #suffix>
              <span class="tag-count">{{ tag.count }}</span>
            </template>
          </n-tag>
        </n-space>
      </n-collapse-item>
    </n-collapse>

    <div v-if="selectedTags.length > 0" class="active-tags">
      <h4>Active Filters:</h4>
      <n-space>
        <n-tag
          v-for="tag in selectedTags"
          :key="tag"
          type="primary"
          closable
          @close="removeTag(tag)"
          :bordered="false"
        >
          {{ tag }}
        </n-tag>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NTag, NSpace, NCollapse, NCollapseItem, NButton } from 'naive-ui'

interface TagCount {
  name: string
  count: number
}

interface Props {
  availableTags: TagCount[]
  selectedTags: string[]
}

interface Emits {
  (e: 'update:selectedTags', tags: string[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const popularTags = computed(() => {
  return props.availableTags
    .slice(0, 8) // Show top 8 tags by default
})

const otherTags = computed(() => {
  return props.availableTags.slice(8)
})

const getTagType = (tagName: string) => {
  return props.selectedTags.includes(tagName) ? 'primary' : 'default'
}

const toggleTag = (tagName: string) => {
  const newTags = [...props.selectedTags]
  const index = newTags.indexOf(tagName)
  
  if (index > -1) {
    newTags.splice(index, 1)
  } else {
    newTags.push(tagName)
  }
  
  emit('update:selectedTags', newTags)
}

const removeTag = (tagName: string) => {
  const newTags = props.selectedTags.filter(tag => tag !== tagName)
  emit('update:selectedTags', newTags)
}

const clearAllTags = () => {
  emit('update:selectedTags', [])
}

const allTags = computed(() => props.availableTags)
</script>

<style scoped>
.tag-filter {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border);
}

.tag-filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tag-filter-header h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.125rem;
  font-weight: 600;
}

.popular-tags {
  margin-bottom: 1rem;
}

.tag-count {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-left: 0.25rem;
}

.active-tags {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-border);
}

.active-tags h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .tag-filter {
    padding: 1rem;
  }
  
  .tag-filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>