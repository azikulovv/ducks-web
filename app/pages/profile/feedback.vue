<script setup lang="ts">
import { useFeedbackApi } from '~/api/feedback.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const { createFeedback } = useFeedbackApi()

const text = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

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

    useNotify().success('Спасибо! Мы получили ваш feedback')
  } catch (e: any) {
    errorMessage.value = e?.error || 'Ошибка отправки'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Обратная связь" />
    </template>
  </BaseHeader>

  <div class="p-6 space-y-4">
    <!-- CARD -->
    <div class="rounded-3xl p-4 border border-white/5 w-full bg-(--secondary)/20">
      <!-- TITLE -->
      <p class="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Ваше сообщение</p>

      <!-- TEXTAREA -->
      <textarea
        v-model="text"
        rows="7"
        maxlength="1000"
        class="mt-3 w-full resize-none rounded-2xl border border-white/5 bg-black/20 p-4 text-sm text-white outline-none transition focus:border-(--logo-bg)/30"
        placeholder="Опишите, что можно улучшить..."
      />

      <!-- FOOTER -->
      <div class="mt-3 flex items-center justify-between">
        <span class="text-[10px] text-gray-500 font-bold tracking-widest">
          {{ text.length }}/1000
        </span>

        <span class="text-[10px] text-gray-500"> Мы читаем каждое сообщение </span>
      </div>

      <!-- ERROR -->
      <div
        v-if="errorMessage"
        class="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
      >
        {{ errorMessage }}
      </div>

      <!-- ACTION -->
      <div class="mt-5">
        <BaseButton class="w-full" :loading="isLoading" :disabled="isLoading" @click="send">
          Отправить
        </BaseButton>
      </div>
    </div>
  </div>
</template>
