<script setup lang="ts">
import { CalendarFold } from '@lucide/vue'
import { useEventsApi } from '~/api/events.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import { statuses } from '~/constants/categories'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const router = useRouter()

const { getMyEvents } = useEventsApi()

const events = ref<any[]>([])
const isLoading = ref(true)
const selectedStatus = ref('')

const loadEvents = async () => {
  isLoading.value = true

  try {
    const res = await getMyEvents({ status: selectedStatus.value })
    events.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

watch(selectedStatus, loadEvents, { immediate: true })
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Мои записи" />
    </template>
  </BaseHeader>

  <div class="p-4 space-y-4">
    <BaseSelect v-model="selectedStatus" :options="statuses" />

    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 4" :key="i" class="h-40 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!events.length"
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <div class="mb-6 flex size-20 items-center justify-center rounded-full bg-(--secondary)/20">
        <CalendarFold :size="40" class="text-gray-500" />
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

    <div v-else class="space-y-4">
      <EventsCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>
