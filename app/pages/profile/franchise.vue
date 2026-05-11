<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { useContactApi } from '~/api/contact.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const form = ref({
  name: '',
  phone: '',
  city: '',
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z
    .string()
    .min(7, 'Введите корректный номер телефона')
    .regex(/^[+0-9\s()-]+$/, 'Некорректный формат телефона'),
  city: z.string().min(2, 'Введите город'),
})

const { validate, errors } = useZodValidation(schema)
const { sendContact } = useContactApi()

const sendForm = async () => {
  error.value = ''
  success.value = false

  if (!validate(form.value)) return

  loading.value = true

  try {
    await sendContact(form.value)

    success.value = true
    form.value = {
      name: '',
      phone: '',
      city: '',
    }
  } catch (e) {
    error.value = 'Не удалось отправить заявку. Попробуйте позже.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Заявка на участие" />
    </template>
  </BaseHeader>

  <div class="p-4 space-y-4 pb-24">
    <!-- HERO -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
      <h2 class="text-lg font-semibold">Оставить заявку</h2>
      <p class="mt-2 text-sm text-gray-400 leading-relaxed">
        Заполните форму — мы свяжемся с вами и добавим в ближайшие события DUCK’S GameClub.
      </p>
    </div>

    <!-- FORM -->
    <form
      @submit.prevent="sendForm"
      class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5 space-y-4"
    >
      <!-- NAME -->
      <div>
        <label class="text-xs text-gray-400">Имя</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Введите имя"
          class="mt-1 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white outline-none border border-white/5 focus:border-white/10"
        />
        <p v-if="errors.name" class="text-xs text-red-400 mt-1">{{ errors.name }}</p>
      </div>

      <!-- PHONE -->
      <div>
        <label class="text-xs text-gray-400">Телефон</label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          class="mt-1 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white outline-none border border-white/5 focus:border-white/10"
        />
        <p v-if="errors.phone" class="text-xs text-red-400 mt-1">{{ errors.phone }}</p>
      </div>

      <!-- CITY -->
      <div>
        <label class="text-xs text-gray-400">Город</label>
        <input
          v-model="form.city"
          type="text"
          placeholder="Введите город"
          class="mt-1 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white outline-none border border-white/5 focus:border-white/10"
        />
        <p v-if="errors.city" class="text-xs text-red-400 mt-1">{{ errors.city }}</p>
      </div>

      <!-- ERROR -->
      <p v-if="error" class="text-xs text-red-400">
        {{ error }}
      </p>

      <!-- SUCCESS -->
      <p v-if="success" class="text-xs text-green-400">
        Заявка отправлена. Мы скоро свяжемся с вами.
      </p>

      <!-- BUTTON -->
      <BaseButton
        class="w-full bg-green-500! text-black! hover:bg-green-400! shadow-lg shadow-green-500/20"
        :disabled="loading"
        :loading="loading"
        type="submit"
      >
        Отправить заявку
      </BaseButton>
    </form>

    <!-- INFO -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
      <p class="text-xs text-gray-400 leading-relaxed">
        После отправки заявки мы добавим вас в систему участников и свяжемся для подтверждения
        участия.
      </p>
    </div>
  </div>
</template>
