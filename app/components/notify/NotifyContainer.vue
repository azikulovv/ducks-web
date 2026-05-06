<script setup lang="ts">
import { useNotify } from '~/composables/useNotify'

const { list, remove } = useNotify()
</script>

<template>
  <div class="fixed top-4 right-4 z-999 space-y-2 w-80">
    <TransitionGroup name="toast">
      <div
        v-for="n in list"
        :key="n.id"
        :class="[
          'p-4 rounded-xl border shadow-lg flex items-start gap-3 text-sm backdrop-blur',
          n.type === 'success' && 'bg-green-500/10 border-green-500/30 text-green-400',
          n.type === 'error' && 'bg-(--warning)/10 border-(--warning)/30 text-(--warning)',
          n.type === 'info' && 'bg-(--secondary)/30 border-white/10 text-white',
          n.type === 'loading' && 'bg-(--secondary)/30 border-white/10 text-white',
        ]"
      >
        <!-- icon -->
        <div class="mt-0.5">
          <span v-if="n.type === 'loading'" class="animate-spin">⏳</span>
          <span v-else-if="n.type === 'success'">✔</span>
          <span v-else-if="n.type === 'error'">✖</span>
          <span v-else>ℹ</span>
        </div>

        <div class="flex-1">{{ n.message }}</div>

        <button @click="remove(n.id)" class="opacity-50 hover:opacity-100">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
.toast-enter-active {
  transition: all 0.25s ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-active {
  transition: all 0.2s ease;
}
</style>
