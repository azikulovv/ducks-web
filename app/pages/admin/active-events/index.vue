<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import ActiveEventsList from '~/components/admin/events/ActiveEventsList.vue'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const router = useRouter()
const { getActiveEventsNow } = useEventsApi()

const events = ref<any[]>([])
const isLoading = ref(true)

const load = async () => {
  isLoading.value = true

  try {
    const res = await getActiveEventsNow()
    events.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

const openEvent = (id: string) => {
  router.push(`/admin/active-events/${id}`)
}
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Активные события" />
    </template>
  </BaseHeader>

  <ActiveEventsList :events="events" :loading="isLoading" @open="openEvent" />
</template>
