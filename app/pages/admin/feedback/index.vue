<script setup lang="ts">
import { useFeedbackApi } from '~/api/feedback.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderMenu from '~/components/layout/header/HeaderMenu.vue'
import HeaderMenuItem from '~/components/layout/header/HeaderMenuItem.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import type { Feedback } from '~/types/feedback'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const { getFeedback, deleteFeedback } = useFeedbackApi()

const feedbacks = ref<Feedback[]>([])
const isLoading = ref(true)
const deletingId = ref<string | null>(null)

/**
 * LOAD
 */
const loadFeedbacks = async () => {
  isLoading.value = true

  try {
    const res = await getFeedback()
    feedbacks.value = res.data
  } finally {
    isLoading.value = false
  }
}

/**
 * DELETE
 */
const removeFeedback = async (id: string) => {
  if (deletingId.value) return

  deletingId.value = id
  try {
    await deleteFeedback(id)
    feedbacks.value = feedbacks.value.filter((f) => f.id !== id)
  } finally {
    deletingId.value = null
  }
}

onMounted(loadFeedbacks)
</script>

<template>
  <BaseHeader>
    <template #left> </template>

    <template #default>
      <HeaderTitle title="Список отзывов" />
    </template>

    <template #right>
      <HeaderMenu>
        <HeaderMenuItem @click="loadFeedbacks">Обновить</HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <!-- LOADING -->
  <div v-if="isLoading" class="p-4 space-y-3">
    <div v-for="i in 4" :key="i" class="h-28 rounded-3xl bg-(--secondary)/20 animate-pulse" />
  </div>

  <!-- EMPTY -->
  <div
    v-else-if="!feedbacks.length"
    class="flex flex-col items-center justify-center text-center px-6 py-24"
  >
    <div class="size-16 rounded-2xl bg-(--secondary)/20 mb-4" />
    <p class="text-sm font-semibold">Пока нет feedback</p>
    <p class="text-xs text-gray-500 mt-1">Пользователи ещё ничего не отправили</p>
  </div>

  <!-- LIST -->
  <div v-else class="p-4 space-y-3 pb-24">
    <div
      v-for="f in feedbacks"
      :key="f.id"
      class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4"
    >
      <div class="flex gap-4">
        <!-- AVATAR -->
        <div
          class="size-10 flex items-center justify-center rounded-2xl bg-(--logo-bg)/10 text-(--logo-bg) font-black"
        >
          {{ getInitial(f.user?.name) }}
        </div>

        <!-- CONTENT -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold truncate">
              {{ f.user?.name || 'Unknown' }}
            </p>

            <span class="text-[10px] text-gray-500">
              {{ formatDate(f.createdAt, { dateStyle: 'short', timeStyle: 'short' }) }}
            </span>
          </div>

          <p class="text-xs text-gray-400 mt-1 truncate">
            {{ f.user?.email }}
          </p>

          <p class="text-sm text-gray-200 mt-3 leading-relaxed whitespace-pre-wrap">
            {{ f.message }}
          </p>

          <!-- ACTIONS -->
          <div class="flex justify-end mt-4">
            <button
              class="text-xs px-3 py-1.5 rounded-xl border border-(--logo-bg)/20 bg-(--logo-bg)/10 text-(--logo-bg) hover:bg-(--logo-bg)/20 transition"
              :disabled="deletingId === f.id"
              @click="removeFeedback(f.id)"
            >
              {{ deletingId === f.id ? 'Удаление...' : 'Удалить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
