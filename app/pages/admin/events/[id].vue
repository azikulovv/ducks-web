<script setup lang="ts">
import { Calendar, Map, Users } from '@lucide/vue'
import { useEventsApi } from '~/api/events.api'
import { useUploadApi } from '~/api/upload.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'

import { categories } from '~/constants/categories'

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
  address: '',
  gameType: '',
  startsAt: '',
  participantLimit: 10,

  imageUrl: '',
  imageHash: '',
  file: null as File | null,
})

/**
 * Load event
 */
const loadEvent = async () => {
  isLoading.value = true

  try {
    const event = await api.getEvent(id)

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

/**
 * Update event
 */
const updateEvent = async () => {
  if (isSaving.value || isUploading.value) return

  errorMessage.value = ''

  try {
    isSaving.value = true

    let imageUrl = form.imageUrl
    let imageHash = form.imageHash

    /**
     * Upload new image
     */
    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await api.updateEvent(
      { id },
      {
        address: form.address,
        gameType: form.gameType,
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

/**
 * Preview image
 */
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  form.file = file
  form.imageUrl = URL.createObjectURL(file)
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Создание события" />
    </template>
  </BaseHeader>

  <!-- LOADING -->
  <div v-if="isLoading" class="flex items-center justify-center py-20 text-gray-500">
    Загрузка события...
  </div>

  <!-- CONTENT -->
  <div v-else class="space-y-6 p-4 pb-10">
    <!-- IMAGE -->
    <div>
      <label class="mb-2 block text-sm text-gray-400"> Обложка </label>

      <label
        class="group relative flex h-56 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/10 bg-(--secondary)/10 transition hover:border-(--primary)/40"
      >
        <img
          v-if="form.imageUrl"
          :src="form.imageUrl.startsWith('/') ? renderPicture(form.imageUrl) : form.imageUrl"
          class="absolute inset-0 h-full w-full object-cover"
        />

        <div class="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />

        <div
          v-if="!form.imageUrl"
          class="relative z-10 flex flex-col items-center gap-3 text-center"
        >
          <div
            class="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md"
          >
            <!-- IMAGE ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16l4-4a2 2 0 012.828 0L14 15l2-2a2 2 0 012.828 0L20 14M7 8h.01M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              />
            </svg>
          </div>

          <div>
            <p class="text-sm font-medium">Загрузить изображение</p>

            <p class="mt-1 text-xs text-gray-400">PNG, JPG, WEBP</p>
          </div>
        </div>

        <!-- EDIT BADGE -->
        <div
          v-if="form.imageUrl"
          class="absolute right-3 bottom-3 rounded-xl bg-black/60 px-3 py-1 text-xs backdrop-blur-md"
        >
          Изменить
        </div>

        <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </label>

      <p v-if="isUploading" class="mt-2 text-xs text-gray-500">Загрузка изображения...</p>
    </div>

    <!-- CATEGORY -->
    <div>
      <label class="mb-2 block text-sm text-gray-400"> Категория </label>

      <BaseSelect v-model="form.gameType" :options="categories" />
    </div>

    <!-- ADDRESS -->
    <div>
      <label class="mb-2 block text-sm text-gray-400"> Локация </label>

      <div
        class="flex h-11.5 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
      >
        <Map :size="20" class="text-gray-500 shrink-0" />

        <input
          v-model="form.address"
          placeholder="Адрес мероприятия"
          class="h-full w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- DATE -->
    <div>
      <label class="mb-2 block text-sm text-gray-400"> Дата и время </label>

      <div
        class="flex h-11.5 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
      >
        <Calendar :size="20" class="text-gray-500 shrink-0" />

        <input
          v-model="form.startsAt"
          type="datetime-local"
          class="h-full w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- PARTICIPANTS -->
    <div>
      <label class="mb-2 block text-sm text-gray-400"> Лимит участников </label>

      <div
        class="flex h-11.5 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
      >
        <Users :size="20" class="text-gray-500 shrink-0" />

        <input
          v-model.number="form.participantLimit"
          type="text"
          inputmode="numeric"
          min="1"
          placeholder="Количество мест"
          class="h-full w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- ERROR -->
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
