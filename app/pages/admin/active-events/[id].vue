<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderMenu from '~/components/layout/header/HeaderMenu.vue'
import HeaderMenuItem from '~/components/layout/header/HeaderMenuItem.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import EventParticipantsList from '~/components/admin/event/EventParticipantsList.vue'
import type { Event, Participant } from '~/types/events'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const id = route.params.id as string

const api = useEventsApi()

const event = ref<Event>()
const participants = ref<Participant[]>([])

const isLoading = ref(true)
const isSavingOrder = ref(false)
const isFinalizing = ref(false)
const isDirty = ref(false)

const load = async () => {
  isLoading.value = true

  try {
    const [e, p] = await Promise.all([api.getEvent(id), api.getEventParticipants(id)])

    event.value = e
    participants.value = p.participants
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

const move = (from: number, direction: 'up' | 'down') => {
  if (event.value?.status === 'completed') return

  const to = direction === 'up' ? from - 1 : from + 1
  if (to < 0 || to >= participants.value.length) return // @ts-ignore
  ;[participants.value[from], participants.value[to]] = [
    participants.value[to],
    participants.value[from],
  ]

  isDirty.value = true
}

const save = async () => {
  if (!isDirty.value) return

  isSavingOrder.value = true

  try {
    await api.reorderParticipants(id, {
      participants: participants.value.map((p, i) => ({
        userId: p.userId || p.user?.id,
        position: i + 1,
      })),
    })

    isDirty.value = false
    await load()
  } finally {
    isSavingOrder.value = false
  }
}

const finalize = async () => {
  if (event.value?.status === 'completed') return

  if (!confirm('Финализировать событие?')) return

  isFinalizing.value = true

  try {
    await api.finalizeEvent(id)
    await load()
  } finally {
    isFinalizing.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Участники" />
    </template>

    <template #right>
      <HeaderMenu>
        <HeaderMenuItem :disabled="!isDirty" @click="save"> Сохранить </HeaderMenuItem>

        <HeaderMenuItem danger @click="finalize"> Завершить </HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <EventParticipantsList
    :loading="isLoading"
    :participants="participants"
    :event="event"
    @move="move"
  />
</template>
