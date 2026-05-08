<script setup lang="ts">
import type { Event } from '~/types/events'

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
    class="group overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20 transition-all hover:bg-white/5 active:scale-[0.99]"
  >
    <div class="relative h-32 w-full bg-black/30">
      <img
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        class="h-full w-full object-cover"
      />

      <div v-else class="flex h-full items-center justify-center text-xs text-gray-600">
        No image
      </div>
    </div>

    <!-- CONTENT -->
    <div class="space-y-3 p-4">
      <!-- TOP ROW: STATUS + GAME TYPE -->
      <div class="flex items-center justify-between">
        <span
          class="rounded-full border px-2 py-1 text-[10px] font-bold tracking-widest"
          :class="statusConfig?.class"
        >
          {{ statusConfig?.label }}
        </span>

        <span class="text-[10px] font-bold tracking-[0.2em] text-(--logo-bg)">
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>

      <!-- TITLE -->
      <h3 class="text-sm font-bold text-white">
        {{ event.address }}
      </h3>

      <!-- META -->
      <div class="flex items-center justify-between text-[11px] text-gray-500">
        <span>
          {{ event._count?.registrations ?? 0 }}/{{ event.participantLimit }} участников
        </span>

        <span>
          {{ formatDate(event.createdAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
        </span>
      </div>

      <!-- ACTIONS -->
      <div class="flex gap-2 pt-2">
        <NuxtLink
          :to="`/admin/events/${event.id}`"
          class="flex-1 rounded-xl bg-white/5 py-2 text-center text-xs font-bold text-white transition hover:bg-white/10"
        >
          Редактировать
        </NuxtLink>

        <button
          class="flex-1 rounded-xl bg-red-500/10 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
