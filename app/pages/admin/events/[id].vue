<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import { useUploadApi } from '~/api/upload.api'
import BackButton from '~/components/BackButton.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const id = route.params.id as string

const api = useEventsApi()
const { uploadImage, isUploading } = useUploadApi()

const isLoading = ref(false)
const isSaving = ref(false)

const form = ref({
  address: '',
  startsAt: '',
  participantLimit: 0,
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

    form.value = {
      address: event.address ?? '',
      startsAt: new Date(event.startsAt).toISOString().slice(0, 16),
      participantLimit: event.participantLimit,
      imageUrl: event.imageUrl ?? '',
      imageHash: event.imageHash ?? '',
      file: null,
    }
  } catch (e) {
    console.error('Failed to load event', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadEvent)

/**
 * Save event
 */
const save = async () => {
  if (isSaving.value || isUploading.value) return

  isSaving.value = true

  try {
    let imageUrl = form.value.imageUrl
    let imageHash = form.value.imageHash

    // upload new image if selected
    if (form.value.file) {
      const uploaded = await uploadImage(form.value.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await api.updateEvent(
      { id },
      {
        address: form.value.address,
        startsAt: form.value.startsAt,
        participantLimit: form.value.participantLimit,
        imageUrl,
        imageHash,
      },
    )

    navigateTo('/admin/events')
  } catch (e) {
    console.error('Save failed', e)
  } finally {
    isSaving.value = false
  }
}

/**
 * Preview file before upload
 */
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  form.value.file = file
  form.value.imageUrl = URL.createObjectURL(file)
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white p-4">
    <!-- Header -->
    <BackButton to="/admin/events" :label="'Назад'" />

    <!-- Loading -->
    <div v-if="isLoading" class="text-gray-500">Загрузка события...</div>

    <!-- Form -->
    <div v-else class="space-y-4 mt-4">
      <!-- IMAGE -->
      <div class="rounded-xl overflow-hidden border border-white/10 bg-black/20">
        <img
          v-if="form.imageUrl"
          :src="form.imageUrl.startsWith('/') ? renderPicture(form.imageUrl) : form.imageUrl"
          class="w-full h-44 object-cover"
        />
        <div v-else class="h-44 flex items-center justify-center text-gray-600">
          Нет изображения
        </div>
      </div>

      <!-- UPLOAD -->
      <div>
        <input type="file" accept="image/*" @change="onFileChange" class="text-sm text-gray-400" />

        <p v-if="isUploading" class="text-xs text-gray-500 mt-1">Загрузка изображения...</p>
      </div>

      <input
        v-model="form.address"
        placeholder="Локация"
        class="w-full bg-(--secondary)/20 rounded-xl p-3 outline-none"
      />

      <input
        v-model="form.startsAt"
        type="datetime-local"
        class="w-full bg-(--secondary)/20 rounded-xl p-3 outline-none"
      />

      <input
        v-model.number="form.participantLimit"
        type="number"
        placeholder="Лимит участников"
        class="w-full bg-(--secondary)/20 rounded-xl p-3 outline-none"
      />

      <!-- SAVE -->
      <button
        @click="save"
        :disabled="isSaving || isUploading"
        class="w-full bg-(--logo-bg) py-3 rounded-xl font-black uppercase active:scale-95 transition"
      >
        <span v-if="isSaving">Сохранение...</span>
        <span v-else>Сохранить</span>
      </button>
    </div>
  </div>
</template>
