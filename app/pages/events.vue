<script setup lang="ts">
import EventsButtonGroup from '~/components/events/EventsButtonGroup.vue'

const categories = [
  { label: 'Все', value: '' },
  {
    label: 'Бильярд',
    value: 'billiards',
  },
  { label: 'Покер', value: 'poker' },
  { label: 'Дартс', value: 'darts' },
]
const selectedCategory = ref<string>('')

const { events, isLoading, error, fetchEvents } = useEventsQuery(selectedCategory)

onMounted(fetchEvents)
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

        <div v-else-if="error" class="text-sm text-(--warning)">
          {{ error }}
        </div>

        <div v-else class="space-y-3">
          <EventsCard v-for="event in events" :key="event.id" :event="event" />
        </div>
      </section>
    </div>

    <!--
    <div class="fixed bottom-24 left-0 right-0 px-6 z-40">
      <button
        class="w-full bg-[#E11D48] text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-wider"
      >
        Записаться на событие
      </button>
    </div> -->
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
