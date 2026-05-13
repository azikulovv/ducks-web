<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@lucide/vue'
import type { Event } from '~/types/event'

const props = defineProps<{
  participant: any
  index: number
  event?: Event
}>()

const emit = defineEmits<{
  (e: 'move', direction: 'up' | 'down'): void
}>()

const move = (dir: 'up' | 'down') => emit('move', dir)
</script>

<template>
  <div
    class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition hover:bg-white/5"
    :class="event?.status === 'completed' ? 'opacity-60' : ''"
  >
    <div class="flex items-center justify-between gap-4">
      <!-- LEFT -->
      <div class="flex items-center gap-4 min-w-0">
        <div
          class="w-9 h-9 flex items-center justify-center rounded-xl bg-(--bg) border border-white/10 text-sm font-black text-gray-300"
        >
          {{ index + 1 }}
        </div>

        <div class="min-w-0">
          <p class="text-sm font-semibold truncate">
            {{ participant.user?.name }}
          </p>

          <p class="text-xs text-gray-500 truncate">
            {{ participant.user?.email }}
          </p>
        </div>
      </div>

      <div class="text-right">
        <div
          class="inline-flex whitespace-nowrap rounded-xl bg-green-500/10 px-2 py-1 text-xs font-bold text-green-400"
        >
          ~10 балл
        </div>
      </div>
    </div>

    <!-- ACTIONS -->
    <div v-if="event?.status !== 'completed'" class="mt-3 grid grid-cols-2 gap-2">
      <button
        class="flex items-center justify-center rounded-xl bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10 active:scale-95 transition"
        @click="move('up')"
      >
        <ArrowUp />
      </button>
      <button
        class="flex items-center justify-center rounded-xl bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10 active:scale-95 transition"
        @click="move('down')"
      >
        <ArrowDown />
      </button>
    </div>
  </div>
</template>
