<script lang="ts" setup>
import type { Event } from '~/types/events'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div
    class="bg-(--secondary)/20 border border-white/5 p-4 rounded-xl flex items-center gap-4 active:scale-[0.98] transition-transform"
  >
    <div
      class="w-16 h-16 rounded-2xl bg-(--secondary)/20 flex items-center justify-center text-3xl shadow-inner"
    >
      <NuxtImg
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        class="w-full h-full object-cover rounded-lg"
      />

      <!-- fallback -->
      <div v-else class="w-full h-full flex items-center justify-center text-xs text-gray-600">
        No image
      </div>
    </div>

    <div class="grow">
      <div class="flex justify-between items-start">
        <h4 class="font-bold text-base leading-tight">{{ event.address }}</h4>
        <span
          class="text-[10px] bg-(--logo-bg)/10 text-(--logo-bg) px-2 py-0.5 rounded-full font-bold uppercase"
        >
          {{ event.gameType }}
        </span>
      </div>

      <div class="flex items-center gap-3 mt-2 text-xs text-gray-500 font-medium">
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {{
            formatDate(event.createdAt, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>
