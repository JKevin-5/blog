<template>
  <div class="pl-10 pr-10 pt-5">
    <div v-for="year in data">
      <div class="text-3xl">{{ year.date }}</div>
      <div v-for="image in year.images">
        <img :src="image.src" />
      </div>
    </div>
    <n-button type="tertiary">
      Tertiary
    </n-button>
  </div>
</template>
<script setup>

const data = ref([
  {
    date: '20251215',
    images:[
      {
        src:""
      },{
        src:""
      }
    ]
  }
])
</script>