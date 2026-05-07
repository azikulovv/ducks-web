<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const id = route.params.id as string

const { getEventParticipants, reorderParticipants } = useEventsApi()

const isSavingOrder = ref(false)

const event = ref<any>(null)
const participants = ref<any[]>([])
const isLoading = ref(true)

/**
 * Load data
 */
const load = async () => {
  isLoading.value = true

  try {
    const res = await getEventParticipants(id)

    event.value = res.event
    participants.value = res.participants
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

/**
 * Points logic (пример)
 */
const getPointsByPosition = (index: number) => {
  const base = event.value?.pointsForParticipation ?? 10

  // простая логика: чем выше место — тем больше очков
  return Math.max(base - index * 2, 1)
}

/**
 * Move participant
 */
const move = (index: number, direction: 'up' | 'down') => {
  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= participants.value.length) return

  const temp = participants.value[index]
  participants.value[index] = participants.value[newIndex]
  participants.value[newIndex] = temp
}

const saveOrder = async () => {
  if (isSavingOrder.value) return

  isSavingOrder.value = true

  try {
    await reorderParticipants(id, {
      participants: participants.value.map((p, index) => ({
        userId: p.userId || p.user?.id,
        position: index + 1,
      })),
    })

    // можно перезагрузить данные чтобы убедиться что сервер сохранил
    await load()
  } catch (e) {
    console.error('Failed to save order', e)
  } finally {
    isSavingOrder.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-semibold">
          {{ event?.address || 'Событие' }}
        </h1>

        <button
          class="rounded-xl bg-(--primary) px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          :disabled="isSavingOrder"
          @click="saveOrder"
        >
          {{ isSavingOrder ? 'Сохранение...' : 'Сохранить порядок' }}
        </button>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="p-4 space-y-4">
      <div class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
      <div class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
      <div class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <!-- LIST -->
    <div v-else class="space-y-3 p-4 pb-24">
      <div
        v-for="(p, index) in participants"
        :key="p.id"
        class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4"
      >
        <div class="flex items-center justify-between gap-3">
          <!-- LEFT -->
          <div class="flex items-center gap-4">
            <!-- POSITION -->
            <div class="text-lg font-bold text-gray-300 w-8">#{{ index + 1 }}</div>

            <!-- USER -->
            <div>
              <p class="text-sm font-medium">
                {{ p.user?.name || 'User' }}
              </p>

              <p class="text-xs text-gray-400">
                {{ p.user?.email }}
              </p>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="text-right">
            <p class="text-sm font-semibold text-green-400">{{ getPointsByPosition(index) }} pts</p>

            <p class="text-xs text-gray-500">очки за место</p>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="mt-3 flex gap-2">
          <button
            class="flex-1 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            @click="move(index, 'up')"
          >
            ↑ выше
          </button>

          <button
            class="flex-1 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            @click="move(index, 'down')"
          >
            ↓ ниже
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
