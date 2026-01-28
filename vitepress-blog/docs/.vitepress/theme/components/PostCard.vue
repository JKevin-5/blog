<template>
  <article class="post-card" :class="{ 'post-card--featured': featured }">
    <div class="post-card__content">
      <header class="post-card__header">
        <h2 class="post-card__title">
          <a :href="post.url" class="post-card__link">{{ post.title }}</a>
        </h2>
        <div class="post-card__meta">
          <time :datetime="post.date" class="post-card__date">
            {{ formatDate(post.date) }}
          </time>
          <span class="post-card__separator">•</span>
          <span class="post-card__reading-time">{{ readingTime }} min read</span>
        </div>
      </header>

      <div v-if="post.excerpt" class="post-card__excerpt">
        <p>{{ post.excerpt }}</p>
      </div>

      <footer class="post-card__footer">
        <div class="post-card__tags">
          <n-tag
            v-for="tag in displayTags"
            :key="tag"
            size="small"
            :bordered="false"
            type="default"
            @click="$emit('tagClick', tag)"
            class="post-card__tag"
          >
            {{ tag }}
          </n-tag>
          <n-tag
            v-if="post.tags.length > displayTags.length"
            size="small"
            :bordered="false"
            type="default"
            class="post-card__tag--more"
          >
            +{{ post.tags.length - displayTags.length }}
          </n-tag>
        </div>
        
        <a :href="post.url" class="post-card__read-more">
          Read More →
        </a>
      </footer>
    </div>

    <div v-if="featured" class="post-card__featured-badge">
      Featured
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NTag } from 'naive-ui'

interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
  year: number
  month: number
}

interface Props {
  post: Post
  featured?: boolean
  maxTags?: number
}

interface Emits {
  (e: 'tagClick', tag: string): void
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
  maxTags: 3
})

defineEmits<Emits>()

const displayTags = computed(() => {
  return props.post.tags.slice(0, props.maxTags)
})

const readingTime = computed(() => {
  // Rough estimate: 200 words per minute
  const wordsPerMinute = 200
  const wordCount = (props.post.excerpt || '').split(' ').length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.post-card--featured {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft));
  border-color: var(--vp-c-brand-1);
}

.post-card__content {
  position: relative;
  z-index: 1;
}

.post-card__header {
  margin-bottom: 1rem;
}

.post-card__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.post-card__link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-card__link:hover {
  color: var(--vp-c-brand-1);
}

.post-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.post-card__separator {
  opacity: 0.5;
}

.post-card__excerpt {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.post-card__excerpt p {
  margin: 0;
}

.post-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.post-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.post-card__tag {
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-card__tag:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.post-card__tag--more {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  cursor: default;
}

.post-card__read-more {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.post-card__read-more:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.post-card__featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .post-card {
    padding: 1rem;
  }
  
  .post-card__title {
    font-size: 1.125rem;
  }
  
  .post-card__footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .post-card__read-more {
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 6px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-border);
  }
  
  .post-card__featured-badge {
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>