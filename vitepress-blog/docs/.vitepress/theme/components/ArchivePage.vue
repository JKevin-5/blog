<template>
  <div class="archive-page">
    <div class="archive-header">
      <h1>Blog Archive</h1>
      <div class="archive-stats">
        <n-tag :bordered="false" type="info">
          {{ totalPosts }} posts
        </n-tag>
        <n-tag :bordered="false" type="success">
          {{ totalTags }} tags
        </n-tag>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <n-space vertical size="large">
        <!-- Search -->
        <n-input
          v-model:value="searchQuery"
          placeholder="Search posts..."
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <n-icon>🔍</n-icon>
          </template>
        </n-input>

        <!-- Tag Filter -->
        <TagFilter
          :available-tags="availableTags"
          :selected-tags="selectedTags"
          @update:selected-tags="selectedTags = $event"
        />
      </n-space>
    </div>

    <!-- Timeline -->
    <div class="timeline-section">
      <n-collapse v-if="groupedPosts.length > 0">
        <n-collapse-item
          v-for="yearData in groupedPosts"
          :key="yearData.year"
          :title="`${yearData.year} (${yearData.posts.length} posts)`"
          :name="yearData.year"
        >
          <div v-for="monthData in yearData.months" :key="`${yearData.year}-${monthData.month}`" class="month-section">
            <h3 class="month-title">
              {{ getMonthName(monthData.month) }} {{ yearData.year }}
              <span class="post-count">({{ monthData.posts.length }} posts)</span>
            </h3>
            <div class="posts-list">
              <PostCard
                v-for="post in monthData.posts"
                :key="post.url"
                :post="post"
                @tag-click="toggleTag"
              />
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>

      <!-- No Results -->
      <n-empty
        v-else
        description="No posts found matching your criteria"
        :show-description="true"
      >
        <template #extra>
          <n-button @click="clearAllFilters">Clear Filters</n-button>
        </template>
      </n-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NInput, NTag, NSpace, NCollapse, NCollapseItem, NButton, NEmpty, NIcon } from 'naive-ui'
import TagFilter from './TagFilter.vue'
import PostCard from './PostCard.vue'

// Import posts data
import { data as posts } from '../posts.data'

// Types
interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
  year: number
  month: number
}

interface TagCount {
  name: string
  count: number
}

interface MonthData {
  month: number
  posts: Post[]
}

interface YearData {
  year: number
  months: MonthData[]
  posts: Post[]
}

// Reactive state
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

// Computed properties
const filteredPosts = computed(() => {
  let filtered = posts

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post =>
      selectedTags.value.every(tag => post.tags.includes(tag))
    )
  }

  return filtered
})

const groupedPosts = computed((): YearData[] => {
  const postsByYear = new Map<number, Map<number, Post[]>>()

  filteredPosts.value.forEach(post => {
    if (!postsByYear.has(post.year)) {
      postsByYear.set(post.year, new Map())
    }
    
    const yearMap = postsByYear.get(post.year)!
    if (!yearMap.has(post.month)) {
      yearMap.set(post.month, [])
    }
    
    yearMap.get(post.month)!.push(post)
  })

  const result: YearData[] = []
  
  Array.from(postsByYear.entries())
    .sort((a, b) => b[0] - a[0]) // Sort years descending
    .forEach(([year, monthMap]) => {
      const months: MonthData[] = []
      let yearPosts: Post[] = []

      Array.from(monthMap.entries())
        .sort((a, b) => b[0] - a[0]) // Sort months descending
        .forEach(([month, monthPosts]) => {
          months.push({
            month,
            posts: monthPosts
          })
          yearPosts = [...yearPosts, ...monthPosts]
        })

      result.push({
        year,
        months,
        posts: yearPosts
      })
    })

  return result
})

const availableTags = computed((): TagCount[] => {
  const tagCounts = new Map<string, number>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})

const totalPosts = computed(() => posts.length)
const totalTags = computed(() => availableTags.value.length)

// Methods
const handleSearch = () => {
  // Search is handled via computed property
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getMonthName = (month: number) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[month - 1]
}

onMounted(() => {
  // Initialize with all years expanded
  const years = groupedPosts.value.map(y => y.year.toString())
  // You could use this to set default expanded years if needed
})
</script>

<style scoped>
.archive-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.archive-header {
  text-align: center;
  margin-bottom: 3rem;
}

.archive-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.archive-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.filters-section {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.tag-filter h3 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.clear-filters {
  margin-top: 1rem;
}

.timeline-section {
  background: var(--vp-c-bg);
}

.month-section {
  margin-bottom: 2rem;
}

.month-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-count {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.posts-list {
  display: grid;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .archive-page {
    padding: 1rem;
  }
  
  .archive-header h1 {
    font-size: 2rem;
  }
  
  .filters-section {
    padding: 1rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .post-tags {
    flex-wrap: wrap;
  }
}
</style>