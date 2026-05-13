<script setup lang="ts">
import type { Event } from '~/types/event'
import ActiveEventBadge from './ActiveEventBadge.vue'

const props = defineProps<{
  event: Event
}>()

const emit = defineEmits<{
  (e: 'open', id: string): void
}>()

const open = () => emit('open', props.event.id)
</script>

<template>
  <div
    class="group rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition hover:bg-white/5 active:scale-[0.99]"
  >
    <div class="flex items-start justify-between gap-4">
      <!-- LEFT -->
      <div class="min-w-0 space-y-2">
        <p class="truncate text-sm font-semibold text-white">
          {{ event.address }}
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <ActiveEventBadge type="game">
            {{ getGameLabel(event.gameType) }}
          </ActiveEventBadge>

          <ActiveEventBadge type="active"> ● активное </ActiveEventBadge>

          <span class="text-[10px] text-gray-500">
            {{ event._count.registrations }} участников
          </span>
        </div>
      </div>

      <!-- ACTION -->
      <button
        class="shrink-0 rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 active:scale-95"
        @click="open"
      >
        Открыть
      </button>
    </div>
  </div>
</template>
