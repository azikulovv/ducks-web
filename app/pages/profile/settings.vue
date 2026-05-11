<script setup lang="ts">
import { User, AtSign, Phone } from '@lucide/vue'
import { useUploadApi } from '~/api/upload.api'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

import BaseInput from '~/components/ui/BaseInput.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'
import { profileSchema } from '~/validation/profile'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const notify = useNotify()
const authStore = useAuthStore()
const { uploadImage, isUploading } = useUploadApi()
const { validate, errors } = useZodValidation(profileSchema)

const isSaving = ref(false)
const errorMessage = ref('')

const form = reactive({
  name: '',
  username: '',
  phone: '',

  avatar: '',
  file: null as File | null,
})

const loadProfile = async () => {
  try {
    const me = await notify.promise(authStore.fetchMe(), {
      loading: 'Загрузка профиля...',
      success: 'Профиль загружен',
      error: 'Не удалось загрузить профиль',
    })

    form.name = me?.name ?? ''
    form.avatar = me?.avatarUrl ?? ''
  } catch (e: any) {
    console.error(e)
    errorMessage.value = 'Не удалось загрузить профиль'
  }
}

onMounted(loadProfile)

const saveProfile = async () => {
  if (!validate(form)) return

  if (isSaving.value) {
    return
  }

  let imageUrl = form.avatar
  let imageHash

  try {
    errorMessage.value = ''
    isSaving.value = true

    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    // await api.updateEvent(
    //   { id },
    //   {
    //     address: form.address,
    //     gameType: form.gameType,
    //     startsAt: form.startsAt,
    //     participantLimit: form.participantLimit,

    //     imageUrl,
    //     imageHash,
    //   },
    // )
  } catch (e: any) {
    console.error(e)
    errorMessage.value = 'Не удалось сохранить профиль'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Редактирование профиля" />
    </template>
  </BaseHeader>

  <form @submit.prevent="saveProfile" class="space-y-6 p-4 pb-10">
    <ImageUpload v-model="form.avatar" label="Аватар" @change="(file) => (form.file = file)" />

    <BaseInput
      v-model="form.name"
      label="Имя"
      placeholder="Введите имя"
      :icon="User"
      :error="errors.name"
    />

    <!-- <BaseInput
      v-model="form.username"
      label="Имя пользователя"
      placeholder="username"
      :icon="AtSign"
      :error="errors.username"
    />

    <BaseInput
      v-model="form.phone"
      label="Телефон"
      type="tel"
      placeholder="+7 777 777 77 77"
      :icon="Phone"
      :error="errors.phone"
    /> -->

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ errorMessage }}
    </div>

    <BaseButton class="w-full" :loading="isSaving" :disabled="isSaving" type="submit">
      Сохранить изменения
    </BaseButton>
  </form>
</template>
