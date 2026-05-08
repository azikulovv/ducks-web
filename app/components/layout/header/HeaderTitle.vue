<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 class="truncate px-2 text-sm font-bold uppercase tracking-[0.24em] text-white">
    {{ title }}
  </h1>
</template>
