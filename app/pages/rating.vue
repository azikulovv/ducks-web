<script setup lang="ts">
const activeTab = ref('poker')

const tabs = [
  { label: 'Покер', value: 'poker' },
  { label: 'Дартс', value: 'darts' },
  { label: 'Бильярд', value: 'billiards' },
]

const { rating, isLoading, error } = useRatingQuery(activeTab)
</script>

<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white pb-24 font-sans">
    <LayoutHeader>Рейтинг игроков</LayoutHeader>

    <div class="px-4">
      <RatingTabsSegmented v-model="activeTab" :items="tabs" />

      <div v-if="isLoading" class="space-y-2 mt-4">
        <div v-for="i in 5" :key="i" class="h-16 rounded-2xl bg-(--secondary)/20 animate-pulse" />
      </div>

      <div v-else-if="error" class="mt-4 text-sm text-(--warning) text-center">
        {{ error }}
      </div>

      <div v-else-if="!rating.length" class="mt-4 text-sm text-gray-500 text-center">
        Нет данных
      </div>

      <RatingLeaderboard v-else :rating="rating" class="mt-4" />
    </div>
  </div>
</template>
