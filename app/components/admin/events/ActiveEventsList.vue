<script setup lang="ts">
import type { Event } from '~/types/event'
import ActiveEventCard from './ActiveEventCard.vue'
import ActiveEventsSkeleton from './ActiveEventsSkeleton.vue'
import ActiveEventsEmpty from './ActiveEventsEmpty.vue'

defineProps<{
  events: Event[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'open', id: string): void
}>()

const open = (id: string) => emit('open', id)
</script>

<template>
  <!-- LOADING -->
  <ActiveEventsSkeleton v-if="loading" />

  <!-- EMPTY -->
  <ActiveEventsEmpty v-else-if="!events.length" />

  <!-- LIST -->
  <div v-else class="space-y-3 p-4 pb-24">
    <ActiveEventCard v-for="event in events" :key="event.id" :event="event" @open="open" />
  </div>
</template>
