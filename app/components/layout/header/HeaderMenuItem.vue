<script setup lang="ts">
const props = defineProps<{
  danger?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const menu = inject<any>('headerMenu')

const handleClick = () => {
  emit('click')
  menu?.close?.()
}
</script>

<template>
  <button
    class="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all"
    :class="danger ? 'text-red-400 hover:bg-red-500/10' : 'text-white hover:bg-white/5'"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
