<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'

definePageMeta({
  layout: false,
  middleware: 'auth',
})

const router = useRouter()

const { getMyEvents } = useEventsApi()

const events = ref<any[]>([])
const isLoading = ref(true)

const loadEvents = async () => {
  isLoading.value = true

  try {
    const res = await getMyEvents()
    events.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadEvents)

/**
 * Open event
 */
const openEvent = (id: string) => {
  router.push(`/events/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between p-4">
        <BackButton to="/profile" label="Назад" />
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="space-y-4 p-4">
      <div v-for="i in 4" :key="i" class="h-40 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!events.length"
      class="flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <div class="mb-6 flex size-20 items-center justify-center rounded-full bg-(--secondary)/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 3v2M16 3v2M4 9h16M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
          />
        </svg>
      </div>

      <h2 class="text-lg font-semibold">Пока нет событий</h2>

      <p class="mt-2 max-w-xs text-sm text-gray-400">Вы ещё не записались ни на одно мероприятие</p>

      <button
        class="mt-6 rounded-2xl bg-(--primary) px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        @click="router.push('/events')"
      >
        Смотреть события
      </button>
    </div>

    <!-- LIST -->
    <div v-else class="space-y-4 p-4 pb-28">
      <EventsCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>
