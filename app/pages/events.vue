<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import EventsButtonGroup from '~/components/events/EventsButtonGroup.vue'
import { categories } from '~/constants/categories'
import type { Event } from '~/types/events'

const { getEvents } = useEventsApi()

const selectedCategory = ref<string>('')
const events = ref<Event[]>()
const isLoading = ref<boolean>(true)
const errorMessage = ref<string>()

const fetchEvents = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getEvents({ gameType: selectedCategory.value })
    events.value = response.data
  } catch (error) {
    errorMessage.value = (error as any).error
  } finally {
    isLoading.value = false
  }
}

watch(selectedCategory, fetchEvents, { immediate: true })
</script>

<template>
  <div class="min-h-screen text-white pb-32">
    <LayoutHeader> Афиша </LayoutHeader>

    <div class="p-4 space-y-6">
      <EventsButtonGroup v-model="selectedCategory" :list="categories" />

      <section>
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">
          Ближайшие события
        </h3>

        <div v-if="isLoading" class="space-y-3">
          <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-(--secondary)/20 animate-pulse" />
        </div>

        <div v-else-if="errorMessage" class="text-sm text-(--warning)">
          {{ errorMessage }}
        </div>

        <div v-else class="space-y-3">
          <EventsCard v-for="event in events" :key="event.id" :event="event" />
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
