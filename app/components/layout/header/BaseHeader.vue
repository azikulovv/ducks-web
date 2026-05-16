<script setup lang="ts">
const slots = useSlots()

const gridClass = computed(() => {
  const hasLeft = !!slots.left
  const hasRight = !!slots.right

  if (hasLeft && hasRight) {
    return 'grid-cols-[90px_1fr_90px]'
  }

  if (hasLeft && !hasRight) {
    return 'grid-cols-[90px_1fr_90px]'
  }

  if (!hasLeft && hasRight) {
    return 'grid-cols-[90px_1fr_90px]'
  }

  return 'grid-cols-1'
})
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-white/5 bg-(--bg)/85 backdrop-blur-2xl"
    :style="{ paddingTop: 'var(--safe-top)' }"
  >
    <div class="grid h-14 items-center px-4" :class="gridClass">
      <div v-if="$slots.left" class="flex items-center">
        <slot name="left" />
      </div>

      <div class="min-w-0 text-center">
        <slot />
      </div>

      <div v-if="$slots.right" class="flex justify-end">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>
