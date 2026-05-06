<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import EventsButtonGroup from '~/components/events/EventsButtonGroup.vue'
import { categories } from '~/constants/categories'
import type { Event } from '~/types/events'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const { getEvents } = useEventsApi()

const selectedCategory = ref('')

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
  <LayoutHeader>Афиша</LayoutHeader>

  <EventsButtonGroup class="p-6" v-model="selectedCategory" :list="categories" />

  <div class="p-6 pb-20">
    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-(--secondary)/20 animate-pulse" />
    </div>

    <div v-else-if="errorMessage" class="text-center text-(--warning)">
      {{ errorMessage }}
      <button @click="fetchEvents" class="block mx-auto mt-2 text-xs underline">Повторить</button>
    </div>

    <div v-else-if="!events?.length" class="text-center text-gray-500 mt-10">Нет событий</div>

    <div v-else class="space-y-3">
      <AdminEventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>
