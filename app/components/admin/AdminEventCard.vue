<script setup lang="ts">
import type { Event } from '~/types/events'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div
    class="rounded-2xl overflow-hidden bg-(--secondary)/20 border border-white/5 active:scale-[0.99] transition"
  >
    <!-- IMAGE -->
    <div class="relative h-32 w-full bg-black/30">
      <img
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        class="w-full h-full object-cover"
      />

      <!-- fallback -->
      <div v-else class="w-full h-full flex items-center justify-center text-xs text-gray-600">
        No image
      </div>

      <!-- DATE BADGE -->
      <div
        class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur text-[10px] font-bold text-white"
      >
        {{ formatDate(event.createdAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
      </div>

      <!-- GAME TYPE BADGE -->
      <div
        class="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-(--accent)/80 text-black text-[10px] font-black uppercase"
      >
        {{ event.gameType }}
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-3">
      <h3 class="font-bold text-sm truncate">
        {{ event.address }}
      </h3>

      <!-- ACTIONS -->
      <div class="flex gap-2 mt-3">
        <NuxtLink
          :to="`/admin/events/${event.id}`"
          class="flex-1 text-xs bg-(--secondary)/30 py-2 rounded-lg text-center"
        >
          Редактировать
        </NuxtLink>

        <button class="flex-1 text-xs bg-(--warning)/20 py-2 rounded-lg text-(--warning)">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
