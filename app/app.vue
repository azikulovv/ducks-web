<script setup lang="ts">
onMounted(() => {
  window.Telegram?.WebApp.ready()
  window.Telegram?.WebApp.expand()
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <NotifyContainer />
  </NuxtLayout>
</template>
