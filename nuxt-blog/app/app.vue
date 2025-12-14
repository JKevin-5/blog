<!-- 根页面框架 -->
<template>
  <UApp>
    <UHeader title="KevinJ" to="/">
      <UNavigationMenu :items="items" />
    </UHeader>
    <NuxtPage />
    <UFooter/>
  </UApp>
</template>
<script setup>

  const route = useRoute()
  
  // 导航栏
  const items = [
    {
      // 相册
      label:'Camera',
      to:'/camera/gallery',
      active: route.path.startsWith('/camera')
    },{
      // 项目
      label:'Project',
      to:'/project',
    },
    {
      // 点子
      label:'Idea',
      to:'/idea',
    },{
      // 旅游
      label:'Travel',
      to:'/travel'
    },{
      // 音乐
      label:'Radio',
      to:'/radio'
    }
  ]
</script>