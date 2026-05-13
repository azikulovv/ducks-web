<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import { useEventRegistrationApi } from '~/api/event-registration.api'
import type { Event } from '~/types/event'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { gameTypeColors } from '~/constants/categories'
import { Calendar, Map } from '@lucide/vue'

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

const toList = (value?: string) => {
  if (!value) return []
  return value
    .split(',')
    .map((i) => i.trim())
    .filter(Boolean)
}

watch(isRegistered, fetchEvent)

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
      <!-- IMAGE -->
      <div class="relative overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20">
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

      <!-- TITLE -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <h1 class="text-lg font-black uppercase tracking-tight">Название мероприятия</h1>

        <p class="text-white font-semibold">
          {{ event.address }}
        </p>

        <span
          class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest backdrop-blur-sm"
          :class="gameTypeColors[event.gameType]"
        >
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>

      <!-- WHEN + WHERE -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest">Когда и где</p>

        <div class="space-y-2 text-sm text-white">
          <div class="flex items-center gap-2">
            <Map class="size-4 text-gray-400" />
            <span>{{ event.city }} — {{ event.address }}</span>
          </div>

          <div class="flex items-center gap-2">
            <Calendar class="size-4 text-gray-400" />
            <span>
              {{ formatDate(event.startsAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
            </span>
          </div>
        </div>
      </div>

      <!-- RULES -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest">Общие правила</p>

        <ul class="space-y-1 text-sm text-gray-200">
          <li v-for="(rule, i) in toList(event.gameRules)" :key="i" class="flex gap-2">
            <span class="text-gray-500">•</span>
            <span>{{ rule }}</span>
          </li>
        </ul>
      </div>

      <!-- FEATURES -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest">Особенности</p>

        <ul class="space-y-1 text-sm text-gray-200">
          <li v-for="(feature, i) in toList(event.features)" :key="i" class="flex gap-2">
            <span class="text-gray-500">•</span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- INFO GRID -->
      <div class="grid grid-cols-1 gap-3">
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
          Участвовать
        </BaseButton>

        <BaseButton
          v-else
          variant="secondary"
          :disabled="isLoading"
          class="w-full"
          @click="unregister"
        >
          Отменить запись
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
