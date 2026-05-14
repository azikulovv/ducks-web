<script setup lang="ts">
import { Calendar, Map, Users } from '@lucide/vue'
import { useEventsApi } from '~/api/events.api'
import { useUploadApi } from '~/api/upload.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'

import { categories } from '~/constants/categories'
import { EventGameType, type Event } from '~/types/event'

definePageMeta({
  layout: 'empty',
  middleware: 'admin',
})

const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const api = useEventsApi()
const { uploadImage, isUploading } = useUploadApi()

const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref('')

const form = reactive({
  title: '',
  city: '',
  gameRules: '',
  features: '',
  address: '',
  gameType: '',
  startsAt: '',
  participantLimit: 10,
  imageUrl: '',
  imageHash: '',
  file: null as File | null,
})

const loadEvent = async () => {
  isLoading.value = true

  try {
    const event = await api.getEvent(id)

    form.title = event.title ?? ''
    form.city = event.city ?? ''
    form.features = event.features ?? ''
    form.gameRules = event.gameRules ?? ''
    form.address = event.address ?? ''
    form.gameType = event.gameType ?? ''
    form.startsAt = new Date(event.startsAt).toISOString().slice(0, 16)
    form.participantLimit = event.participantLimit ?? 10
    form.imageUrl = event.imageUrl ?? ''
    form.imageHash = event.imageHash ?? ''
  } catch (e: any) {
    console.error(e)

    errorMessage.value = e?.error || 'Не удалось загрузить событие'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadEvent)

const updateEvent = async () => {
  if (isSaving.value || isUploading.value) return

  errorMessage.value = ''

  try {
    isSaving.value = true

    let imageUrl = form.imageUrl
    let imageHash = form.imageHash

    /**
     * загрузка нового изображения
     */
    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await api.updateEvent(
      { id },
      {
        title: form.title,
        city: form.city,
        features: form.features,
        gameRules: form.gameRules,
        address: form.address,
        gameType: form.gameType as EventGameType,
        startsAt: form.startsAt,
        participantLimit: form.participantLimit,

        imageUrl,
        imageHash,
      },
    )

    router.push('/admin/events')
  } catch (e: any) {
    console.error(e)

    errorMessage.value = e?.error || 'Не удалось обновить событие'
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
      <HeaderTitle title="Редактирование события" />
    </template>
  </BaseHeader>

  <div v-if="isLoading" class="flex items-center justify-center py-20 text-gray-500">
    Загрузка события...
  </div>

  <div v-else class="space-y-6 p-4 pb-10">
    <ImageUpload
      v-model="form.imageUrl"
      :loading="isUploading"
      @change="(file) => (form.file = file)"
    />

    <BaseSelect v-model="form.gameType" label="Категория" :options="categories" />

    <BaseInput
      v-model="form.title"
      type="text"
      label="Название"
      placeholder="Название мероприятия"
      :icon="Map"
    />

    <BaseInput v-model="form.city" type="text" label="Город" placeholder="Москва" :icon="Map" />

    <BaseInput
      v-model="form.address"
      type="text"
      label="Адрес"
      placeholder="Адрес мероприятия"
      :icon="Map"
    />

    <BaseInput
      v-model="form.startsAt"
      type="datetime-local"
      label="Дата и время"
      :icon="Calendar"
    />

    <BaseInput
      v-model="form.participantLimit"
      type="text"
      inputmode="numeric"
      label="Лимит участников"
      placeholder="Количество мест"
      :icon="Users"
    />

    <BaseInput
      v-model="form.gameRules"
      type="text"
      label="Правила игры"
      placeholder="1 правило игры, 2 правило игры ..."
      :icon="Map"
    />

    <BaseInput
      v-model="form.features"
      type="text"
      label="Особенности"
      placeholder="1 особенность, 2 особенность ..."
      :icon="Map"
    />

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ errorMessage }}
    </div>

    <BaseButton
      class="w-full"
      :disabled="isSaving || isUploading"
      :loading="isSaving || isUploading"
      @click="updateEvent"
    >
      Сохранить изменения
    </BaseButton>
  </div>
</template>
