---
title: "Advanced Vue 3 Composition API Patterns"
date: "2024-02-28"
tags: ["vue", "composition-api", "javascript", "advanced"]
excerpt: "Explore powerful Composition API patterns and techniques for building reusable and maintainable Vue 3 applications."

---

# Advanced Vue 3 Composition API Patterns

The Composition API in Vue 3 has revolutionized how we write Vue applications. While many developers are familiar with the basics, there are several advanced patterns that can significantly improve your code organization and reusability.

## Custom Composables: Beyond the Basics

Custom composables are one of the most powerful features of the Composition API. Let's explore some advanced patterns:

### State Management Composables

Instead of relying on Vuex for simple state management, you can create reusable state composables:

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const isEven = computed(() => count.value % 2 === 0)
  const isOdd = computed(() => count.value % 2 !== 0)
  
  return {
    count,
    increment,
    decrement,
    reset,
    isEven,
    isOdd
  }
}
```

### Async Data Fetching Patterns

Handling async operations in composables requires careful error handling and loading states:

```javascript
// useAsyncData.js
import { ref, readonly, watchEffect } from 'vue'

export function useAsyncData(fetcher, deps = []) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  const execute = async () => {
    loading.value = true
    error.value = null
    
    try {
      const result = await fetcher()
      data.value = result
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
  watchEffect(execute)
  
  return {
    data: readonly(data),
    error: readonly(error),
    loading: readonly(loading),
    execute
  }
}
```

## Composable Composition: Higher-Order Patterns

Just like higher-order functions, you can create higher-order composables that wrap other composables:

```javascript
// useLocalStorage.js
export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)
  
  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )
  
  return value
}

// Higher-order composable
export function usePersistentCounter(initialValue = 0) {
  const counter = useCounter(initialValue)
  const storedCount = useLocalStorage('counter', initialValue)
  
  // Sync the counter with localStorage
  watch(storedCount, (newValue) => {
    counter.count.value = newValue
  })
  
  return counter
}
```

## Advanced Reactivity Patterns

### Create Shared Reactive State

Sometimes you need shared state across multiple components without a full state management solution:

```javascript
// createSharedState.js
import { reactive } from 'vue'

const sharedState = reactive({
  user: null,
  theme: 'light',
  notifications: []
})

export function createSharedState() {
  return {
    state: sharedState,
    setUser: (user) => sharedState.user = user,
    setTheme: (theme) => sharedState.theme = theme,
    addNotification: (notification) => sharedState.notifications.push(notification)
  }
}
```

### Computed with Side Effects

While computed properties should be pure, sometimes you need to trigger side effects based on reactive changes:

```javascript
// useComputedEffect.js
import { computed, watch } from 'vue'

export function useComputedEffect(getter, effect) {
  const value = computed(getter)
  
  watch(value, effect, { immediate: true })
  
  return value
}
```

## Performance Optimization Patterns

### Debounced Composables

For handling user input efficiently:

```javascript
// useDebounce.js
import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value)
  
  watch(value, (newValue) => {
    const timer = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
    
    return () => clearTimeout(timer)
  })
  
  return debouncedValue
}
```

### Virtual Scrolling with Composition API

For handling large lists efficiently:

```javascript
// useVirtualList.js
import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useVirtualList(items, itemHeight = 40, containerHeight = 400) {
  const scrollTop = ref(0)
  const containerRef = ref(null)
  
  const startIndex = computed(() => 
    Math.floor(scrollTop.value / itemHeight)
  )
  
  const endIndex = computed(() => 
    Math.min(
      startIndex.value + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    )
  )
  
  const visibleItems = computed(() => 
    items.slice(startIndex.value, endIndex.value).map((item, index) => ({
      item,
      index: startIndex.value + index
    }))
  )
  
  const offsetY = computed(() => startIndex.value * itemHeight)
  const totalHeight = computed(() => items.length * itemHeight)
  
  const handleScroll = (e) => {
    scrollTop.value = e.target.scrollTop
  }
  
  onMounted(() => {
    containerRef.value?.addEventListener('scroll', handleScroll)
  })
  
  onUnmounted(() => {
    containerRef.value?.removeEventListener('scroll', handleScroll)
  })
  
  return {
    containerRef,
    visibleItems,
    offsetY,
    totalHeight
  }
}
```

## Testing Composables

Testing composables is straightforward with Vue Test Utils:

```javascript
// useCounter.spec.js
import { useCounter } from './useCounter'
import { ref } from 'vue'

test('useCounter increments correctly', () => {
  const { count, increment } = useCounter()
  
  expect(count.value).toBe(0)
  
  increment()
  
  expect(count.value).toBe(1)
})
```

## Conclusion

The Composition API opens up powerful patterns for building maintainable, reusable Vue applications. By mastering these advanced techniques, you can create more sophisticated and efficient applications while keeping your code clean and organized.

Remember that the key to good composables is:
- Single responsibility principle
- Clear input/output interfaces
- Proper error handling
- Good TypeScript support when applicable

Start incorporating these patterns into your projects and you'll see significant improvements in code quality and maintainability.