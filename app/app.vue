<script setup lang="ts">
useHead({
  meta: [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=0',
    },
  ],
  link: [{ rel: 'apple-touch-icon', href: '/192.png' }],
})

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
