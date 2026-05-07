<script setup lang="ts">
import { useFeedbackApi } from '~/api/feedback.api'

const router = useRouter()

const { createFeedback } = useFeedbackApi()

const text = ref('')

const isLoading = ref(false)
const errorMessage = ref('')

/**
 * Send feedback
 */
const send = async () => {
  if (!text.value.trim()) {
    errorMessage.value = 'Введите ваше сообщение'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''

    await createFeedback({
      message: text.value,
    })

    text.value = ''

    useNotify().success('Ваше сообщение успешно отправлено')
  } catch (e: any) {
    console.error(e)

    errorMessage.value = e?.error || 'Не удалось отправить feedback'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <LayoutHeader>ВАШИ ИДЕИ</LayoutHeader>

    <div class="mx-auto max-w-2xl p-6">
      <!-- FORM -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5 backdrop-blur-sm">
        <label class="mb-3 block text-sm text-gray-400"> Что бы вы хотели улучшить? </label>

        <textarea
          v-model="text"
          rows="8"
          maxlength="1000"
          class="w-full resize-none rounded-2xl border border-white/5 bg-black/10 p-4 outline-none transition focus:border-(--primary)/40"
          placeholder="Например: добавить новые турниры, улучшить интерфейс, добавить рейтинг игроков..."
        />

        <!-- FOOTER -->
        <div class="mt-3 flex items-center justify-between">
          <p class="text-xs text-gray-500">{{ text.length }}/1000</p>

          <p class="text-xs text-gray-500">Мы читаем каждое сообщение ❤️</p>
        </div>

        <!-- ERROR -->
        <div
          v-if="errorMessage"
          class="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
        >
          {{ errorMessage }}
        </div>

        <!-- ACTION -->
        <div class="mt-5">
          <BaseButton class="w-full" :loading="isLoading" :disabled="isLoading" @click="send">
            Отправить feedback
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
