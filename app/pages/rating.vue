<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  middleware: 'auth',
})

const activeTab = ref('poker')

const tabs = [
  { label: 'Покер', value: 'poker' },
  { label: 'Дартс', value: 'darts' },
  { label: 'Бильярд', value: 'billiards' },
]

const { rating, isLoading, error } = useRatingQuery(activeTab)
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Рейтинг игроков" />
    </template>
  </BaseHeader>

  <div class="p-4">
    <RatingTabsSegmented v-model="activeTab" :items="tabs" />

    <div class="mt-4">
      <div v-if="isLoading" class="space-y-2">
        <div v-for="i in 5" :key="i" class="h-16 animate-pulse rounded-2xl bg-(--secondary)/20" />
      </div>
      <div v-else-if="error" class="text-center text-sm text-(--warning)">
        {{ error }}
      </div>
      <div v-else-if="!rating.length" class="text-center text-sm text-gray-500">Нет данных</div>

      <RatingLeaderboard v-else :rating="rating" />
    </div>
  </div>
</template>
