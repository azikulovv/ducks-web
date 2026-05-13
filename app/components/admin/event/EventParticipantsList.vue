<script setup lang="ts">
import type { Event } from '~/types/event'
import EventParticipantCard from './EventParticipantCard.vue'
import EventParticipantSkeleton from './EventParticipantSkeleton.vue'

defineProps<{
  participants: any[]
  event?: Event
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'move', index: number, direction: 'up' | 'down'): void
}>()

const move = (i: number, dir: 'up' | 'down') => emit('move', i, dir)
</script>

<template>
  <div v-if="loading" class="p-4 space-y-3">
    <EventParticipantSkeleton v-for="i in 3" :key="i" />
  </div>

  <div v-else class="space-y-3 p-4 pb-24">
    <EventParticipantCard
      v-for="(p, i) in participants"
      :key="p.id"
      :participant="p"
      :index="i"
      :event="event"
      @move="move(i, $event)"
    />
  </div>
</template>
