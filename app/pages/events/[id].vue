<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import { useEventRegistrationApi } from '~/api/event-registration.api'

const route = useRoute()
const eventId = computed(() => route.params.id as string)

const eventsApi = useEventsApi()

const event = ref<any>(null)
const isLoadingEvent = ref(false)
const error = ref<string | null>(null)

// registration
const { isRegistered, register, unregister, fetchStatus, isLoading } =
  useEventRegistrationApi(eventId)

// =========================
// LOAD EVENT
// =========================
const fetchEvent = async () => {
  try {
    isLoadingEvent.value = true
    error.value = null

    event.value = await eventsApi.getEvent(eventId.value)
  } catch (e) {
    error.value = 'Не удалось загрузить событие'
  } finally {
    isLoadingEvent.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchEvent(), fetchStatus()])
})
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between p-4">
        <BackButton to="/events" label="Назад" />
      </div>
    </div>

    <div class="p-4 pb-24">
      <!-- LOADING -->
      <div v-if="isLoadingEvent" class="animate-pulse space-y-4">
        <div class="h-40 bg-[#1A1A1A] rounded-2xl" />
        <div class="h-4 bg-[#1A1A1A] rounded w-2/3" />
        <div class="h-4 bg-[#1A1A1A] rounded w-1/2" />
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="text-red-400 text-sm">
        {{ error }}
      </div>

      <!-- CONTENT -->
      <div v-else-if="event" class="space-y-5">
        <!-- IMAGE -->
        <div class="rounded-2xl overflow-hidden bg-[#1A1A1A]">
          <img
            v-if="event.imageUrl"
            :src="renderPicture(event.imageUrl)"
            class="w-full h-48 object-cover"
          />
          <div v-else class="h-48 flex items-center justify-center text-gray-600">
            Нет изображения
          </div>
        </div>

        <div>
          <h1 class="text-xl font-black uppercase tracking-tight">
            {{ event.address }}
          </h1>
        </div>

        <!-- META -->
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-[#1A1A1A] p-3 rounded-xl">
            <p class="text-gray-500">Дата</p>
            <p class="font-bold">
              {{ formatDate(event.startsAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
            </p>
          </div>

          <div class="bg-[#1A1A1A] p-3 rounded-xl">
            <p class="text-gray-500">Участники</p>
            <p class="font-bold">
              {{ event._count?.registrations }} / {{ event.participantLimit }}
            </p>
          </div>
        </div>

        <!-- DESCRIPTION -->
        <!-- <div class="bg-[#1A1A1A] p-4 rounded-2xl">
        <p class="text-sm text-gray-300 leading-relaxed">
          {{ event.description || 'Описание отсутствует' }}
        </p>
      </div> -->

        <!-- ACTION -->
        <div class="pt-2">
          <BaseButton v-if="!isRegistered" :disabled="isLoading" @click="register">
            Записаться
          </BaseButton>

          <BaseButton v-else :disabled="isLoading" variant="secondary" @click="unregister">
            Отписаться
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
