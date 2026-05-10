<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import { useEventRegistrationApi } from '~/api/event-registration.api'
import type { Event } from '~/types/events'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { gameTypeColors } from '~/constants/categories'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

const eventsApi = useEventsApi()

const event = ref<Event>()
const isLoadingEvent = ref(false)
const error = ref<string | null>(null)

const { isRegistered, register, unregister, fetchStatus, isLoading } =
  useEventRegistrationApi(eventId)

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
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Событие" />
    </template>
  </BaseHeader>

  <div class="p-4 pb-24 space-y-5">
    <!-- LOADING -->
    <div v-if="isLoadingEvent" class="space-y-3 animate-pulse">
      <div class="h-44 rounded-2xl bg-white/5" />
      <div class="h-4 w-2/3 rounded bg-white/5" />
      <div class="h-4 w-1/2 rounded bg-white/5" />
    </div>

    <div
      v-else-if="error"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ error }}
    </div>

    <div v-else-if="event" class="space-y-5">
      <div class="relative overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20">
        <NuxtImg
          v-if="event.imageUrl"
          :src="renderPicture(event.imageUrl)"
          class="h-52 w-full object-cover"
        />

        <div v-else class="h-52 flex items-center justify-center text-gray-600">
          Нет изображения
        </div>

        <div
          class="absolute top-3 right-3 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest"
          :class="statusMap[event.status].class ?? statusMap.draft.class"
        >
          {{ getStatusLabel(event.status) }}
        </div>
      </div>

      <!-- TITLE CARD -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
        <h1 class="text-lg font-black uppercase tracking-tight">
          {{ event.address }}
        </h1>

        <span
          class="rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest backdrop-blur-sm"
          :class="gameTypeColors[event.gameType]"
        >
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>

      <!-- INFO GRID -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4">
          <p class="text-[10px] text-gray-500 uppercase tracking-widest">Дата</p>
          <p class="mt-1 text-sm font-bold">
            {{ formatDate(event.startsAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
          </p>
        </div>

        <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4">
          <p class="text-[10px] text-gray-500 uppercase tracking-widest">Участники</p>
          <p class="mt-1 text-sm font-bold">
            {{ event._count?.registrations }} / {{ event.participantLimit }}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="event.status === 'published'" class="pt-2">
        <BaseButton v-if="!isRegistered" :disabled="isLoading" class="w-full" @click="register">
          Записаться
        </BaseButton>

        <BaseButton
          v-else
          variant="secondary"
          :disabled="isLoading"
          class="w-full"
          @click="unregister"
        >
          Отписаться
        </BaseButton>
      </div>

      <!-- FINISHED STATE -->
      <div
        v-else
        class="rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-sm text-gray-400"
      >
        Событие недоступно
      </div>
    </div>
  </div>
</template>
