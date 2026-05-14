<script lang="ts" setup>
import { Calendar } from '@lucide/vue'
import { gameTypeColors } from '~/constants/categories'
import type { Event } from '~/types/event'

const props = defineProps<{
  event: Event
}>()

const statusConfig = computed(() => {
  const status = props.event.status

  return statusMap[status] ?? statusMap.draft
})
</script>

<template>
  <div
    class="relative flex gap-4 rounded-2xl border border-white/5 bg-(--secondary)/20 p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/5 active:scale-[0.99] cursor-pointer"
    @click="navigateTo(`/events/${event.id}`)"
  >
    <div
      class="relative w-24 self-stretch shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-black/20"
    >
      <NuxtImg
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        v-else
        class="flex h-full min-h-23 items-center justify-center text-[10px] text-gray-600"
      >
        NO IMAGE
      </div>
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <h4 class="line-clamp-2 text-sm font-bold leading-5 text-white">
          {{ event.title }}
        </h4>

        <span
          class="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-widest"
          :class="statusConfig?.class"
        >
          {{ statusConfig?.label }}
        </span>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-gray-500">
        <span class="flex min-w-0 items-center gap-1">
          <Calendar :size="16" class="shrink-0" />

          <span class="truncate">
            {{
              formatDate(event.startsAt, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            }}
          </span>
        </span>

        <span class="text-gray-700">•</span>

        <span
          class="rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest backdrop-blur-sm"
          :class="gameTypeColors[event.gameType]"
        >
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>
    </div>
  </div>
</template>
