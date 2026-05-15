<script setup lang="ts">
import { registerSchema, type RegisterSchema } from '~/validation/register'
import { useZodValidation } from '~/composables/useZodValidation'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

const form = ref<RegisterSchema>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

const isLoading = ref(false)

const notify = useNotify()
const { errors, validate } = useZodValidation<RegisterSchema>(registerSchema)
const { register } = useAuthStore()

const registerHandler = async () => {
  if (!validate(form.value)) return

  try {
    isLoading.value = true

    await notify.promise(
      register({
        email: form.value.email,
        name: form.value.name,
        password: form.value.password,
      }),
      {
        loading: 'Создаем аккаунт...',
        success: 'Аккаунт создан!',
        error: 'Произошла ошибка при созданий аккаунта',
      },
    )
    await navigateTo('/login')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-start p-6 font-sans overflow-x-hidden"
  >
    <BackButton to="/login" label="Назад" />

    <AuthLogo class="mt-8" />

    <!-- Форма регистрации -->
    <form @submit.prevent="registerHandler" class="w-full max-w-85 space-y-4">
      <h2 class="text-center uppercase text-lg font-black mb-6 tracking-wide">Регистрация</h2>

      <div class="space-y-3">
        <!-- Никнейм -->
        <AuthInput
          v-model="form.name"
          type="text"
          placeholder="Ваше имя"
          :error="!!errors.name"
          :error-message="errors.name"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </template>
        </AuthInput>

        <!-- Email -->
        <AuthInput
          v-model="form.email"
          type="text"
          placeholder="Email"
          :error="!!errors.email"
          :error-message="errors.email"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </template>
        </AuthInput>

        <!-- Пароль -->
        <AuthInput
          v-model="form.password"
          type="password"
          placeholder="Придумайте пароль"
          :error="!!errors.password"
          :error-message="errors.password"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </template>
        </AuthInput>

        <!-- Подтверждение пароля -->
        <AuthInput
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          :error="!!errors.confirmPassword"
          :error-message="errors.confirmPassword"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </template>
        </AuthInput>
      </div>

      <!-- Соглашение -->
      <CheckboxAgreement v-model="form.agree">
        Ставя галочку, я подтверждаю свое согласие с условиями
        <NuxtLink to="/docs/agreement.pdf" class="text-(--logo-bg) font-bold underline">
          пользовательского соглашения
        </NuxtLink>
        и
        <NuxtLink to="/docs/oferta.pdf" class="text-(--logo-bg) font-bold underline">
          публичной оферты.
        </NuxtLink>
      </CheckboxAgreement>

      <!-- Кнопка регистрации -->
      <BaseButton type="submit"> ЗАРЕГИСТРИРОВАТЬСЯ </BaseButton>

      <div class="text-center pt-4">
        <p class="text-center text-sm text-gray-500 mt-8">
          Уже в клубе?
          <NuxtLink to="/login" class="text-(--logo-bg) font-semibold">Войти</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Плавное появление контента */
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
