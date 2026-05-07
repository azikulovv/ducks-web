<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const router = useRouter()
const { getActiveEventsNow } = useEventsApi()

const events = ref<any[]>([])
const isLoading = ref(true)

const load = async () => {
  isLoading.value = true

  try {
    const res = await getActiveEventsNow()
    events.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

const openEvent = (id: string) => {
  router.push(`/admin/active-events/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="px-4 py-4">
        <h1 class="text-xl font-semibold">Активные события</h1>
        <p class="text-sm text-gray-400">События, которые сейчас проходят</p>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="space-y-4 p-4">
      <div v-for="i in 4" :key="i" class="h-32 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!events.length"
      class="flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <h2 class="text-lg font-semibold">Сейчас нет активных событий</h2>
      <p class="mt-2 text-sm text-gray-400">Ничего не проходит в данный момент</p>
    </div>

    <!-- LIST -->
    <div v-else class="space-y-4 p-4 pb-24">
      <div
        v-for="event in events"
        :key="event.id"
        class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-sm font-semibold">
              {{ event.address }}
            </p>

            <p class="text-xs text-gray-400">
              {{ event.gameType }}
            </p>

            <p class="text-xs text-green-400">● Сейчас идёт</p>

            <p class="text-xs text-gray-500">{{ event._count.registrations }} участников</p>
          </div>

          <button
            class="rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            @click="openEvent(event.id)"
          >
            Открыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
