<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Information from '~/components/ui/Information.vue'
import { EventGameStatus, type Event } from '~/types/event'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const api = useEventsApi()

const topEvents = ref<Event[]>([])

const loadTopEvents = async () => {
  const { data: events } = await api.getEvents({ status: EventGameStatus.PUBLISHED })

  if (events && !events?.length) {
    topEvents.value = []
    return
  }

  const nearestEvents = [...events]
    .sort((a, b) => {
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    })
    .slice(0, 2)

  topEvents.value = nearestEvents
}

onMounted(() => {
  loadTopEvents()
})
</script>

<template>
  <main class="relative z-10 space-y-5 px-4 pb-6 pt-4">
    <HomeHero />

    <section v-if="topEvents.length" class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
          Ближайшие события
        </h3>

        <NuxtLink to="/events" class="text-[11px] font-medium text-(--accent)"> Все </NuxtLink>
      </div>

      <div class="grid gap-3" :style="{ gridTemplateColumns: `repeat(${topEvents.length}, 1fr)` }">
        <HomeEventCard v-for="e in topEvents" :key="e.id" :event="e" />
      </div>
    </section>

    <HomeNavigation />
    <Information class="mt-2">
      Все игры клуба DUCK’S не предполагают материального вознаграждения. Только рейтинг.
    </Information>
  </main>
</template>
