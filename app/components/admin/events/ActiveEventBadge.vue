<script setup lang="ts">
defineProps<{
  type: 'game' | 'active'
}>()
</script>

<template>
  <span
    class="rounded-xl px-2 py-1 text-[10px] font-bold uppercase"
    :class="
      type === 'game' ? 'bg-(--logo-bg)/10 text-(--logo-bg)' : 'bg-green-500/10 text-green-400'
    "
  >
    <slot />
  </span>
</template>
