<script setup lang="ts">
import { EllipsisVertical } from '@lucide/vue'

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggle = () => (isOpen.value = !isOpen.value)
const close = () => (isOpen.value = false)

provide('headerMenu', {
  close,
})

onMounted(() => {
  const handler = (e: MouseEvent) => {
    if (!menuRef.value) return
    if (!menuRef.value.contains(e.target as Node)) {
      close()
    }
  }

  document.addEventListener('click', handler)

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler)
  })
})
</script>

<template>
  <div ref="menuRef" class="relative flex justify-end">
    <!-- trigger -->
    <button
      class="flex size-8 items-center justify-center rounded-xl border border-white/5 bg-white/3 text-gray-400 transition-all hover:bg-white/6 hover:text-white active:scale-95"
      @click.stop="toggle"
    >
      <EllipsisVertical :size="16" />
    </button>

    <!-- dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-11 right-0 w-52 overflow-hidden rounded-2xl border border-white/5 bg-[#14151c] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
