<script setup>
import { NImage } from 'naive-ui';

const data = ref([
  {
    date: '20251215',
    images:[
      {
        src:"https://cdn.jsdelivr.net/gh/JKevin-5/blog@feat/init-nuxt-blog/nuxt-blog/assets/imges/cat-251214.jpg"
      },{
        src:"https://cdn.jsdelivr.net/gh/JKevin-5/blog@feat/init-nuxt-blog/nuxt-blog/assets/imges/cat-251214.jpg"
      }
    ]
  }
])
</script>
<template>
  <div class="pl-10 pr-10 pt-5">
    <div v-for="year in data">
      <div class="text-3xl">{{ year.date }}</div>
      <div class="flex gap-2">
        <div v-for="image in year.images">
          <n-image
            width="300"
            :src="image.src"
          />
        </div>
      </div>
    </div>
  </div>
</template>