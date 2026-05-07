<script setup lang="ts">
import { useFeedbackApi } from '~/api/feedback.api'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const router = useRouter()

const { getFeedback, deleteFeedback } = useFeedbackApi()

const feedbacks = ref<any[]>([])

const isLoading = ref(true)
const deletingId = ref<string | null>(null)

/**
 * Load feedbacks
 */
const loadFeedbacks = async () => {
  isLoading.value = true

  try {
    const res = await getFeedback()

    feedbacks.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

/**
 * Delete feedback
 */
const removeFeedback = async (id: string) => {
  if (deletingId.value) return

  try {
    deletingId.value = id

    await deleteFeedback(id)

    feedbacks.value = feedbacks.value.filter((item) => item.id !== id)
  } catch (e) {
    console.error(e)
  } finally {
    deletingId.value = null
  }
}

onMounted(loadFeedbacks)
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between px-4 py-4">
        <div>
          <h1 class="text-xl font-semibold">Feedback</h1>

          <p class="mt-1 text-sm text-gray-400">Все отзывы и предложения пользователей</p>
        </div>

        <!-- REFRESH -->
        <button
          class="flex size-11 items-center justify-center rounded-2xl border border-white/5 bg-(--secondary)/20 transition hover:bg-(--secondary)/40"
          @click="loadFeedbacks"
        >
          <!-- refresh icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6M20 20v-6h-6" />

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20 9a8 8 0 00-13.657-5.657L4 6m16 12l-2.343-2.343A8 8 0 014 15"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="space-y-4 p-4">
      <div v-for="i in 5" :key="i" class="h-40 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!feedbacks.length"
      class="flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <div class="mb-6 flex size-20 items-center justify-center rounded-full bg-(--secondary)/20">
        <!-- chat icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 10h8M8 14h5M7 4h10a3 3 0 013 3v6a3 3 0 01-3 3h-3l-4 4v-4H7a3 3 0 01-3-3V7a3 3 0 013-3z"
          />
        </svg>
      </div>

      <h2 class="text-lg font-semibold">Нет feedback</h2>

      <p class="mt-2 max-w-xs text-sm text-gray-400">
        Пользователи пока не оставили ни одного сообщения
      </p>
    </div>

    <!-- LIST -->
    <div v-else class="space-y-4 p-4 pb-28">
      <div
        v-for="feedback in feedbacks"
        :key="feedback.id"
        class="overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20"
      >
        <!-- TOP -->
        <div class="flex items-start justify-between gap-4 p-5">
          <div class="flex items-start gap-4">
            <!-- AVATAR -->
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-(--primary)/15 text-sm font-semibold text-(--primary)"
            >
              {{ feedback.user?.name?.[0] || 'U' }}
            </div>

            <!-- USER -->
            <div>
              <h3 class="text-sm font-semibold">
                {{ feedback.user?.name || 'Unknown user' }}
              </h3>

              <p class="mt-1 text-xs text-gray-400">
                {{ feedback.user?.email }}
              </p>

              <p class="mt-3 text-sm leading-relaxed text-gray-200">
                {{ feedback.message }}
              </p>
            </div>
          </div>

          <!-- DELETE -->
          <button
            class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-(--logo-bg)/20 bg-(logo-bg)/10 text-(--logo-bg) transition hover:bg-(--logo-bg)/20"
            @click="removeFeedback(feedback.id)"
          >
            <!-- trash icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12" />

              <path stroke-linecap="round" stroke-linejoin="round" d="M9 7V4h6v3" />

              <path stroke-linecap="round" stroke-linejoin="round" d="M10 11v6M14 11v6" />

              <path stroke-linecap="round" stroke-linejoin="round" d="M5 7l1 13h12l1-13" />
            </svg>
          </button>
        </div>

        <!-- FOOTER -->
        <div
          class="flex items-center justify-between border-t border-white/5 px-5 py-3 text-xs text-gray-500"
        >
          <span>
            {{
              new Date(feedback.createdAt).toLocaleString('ru-RU', {
                day: '2-digit',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </span>

          <!-- <button
            class="transition hover:text-white"
            @click="router.push(`/admin/users/${feedback.userId}`)"
          >
            Открыть профиль
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
