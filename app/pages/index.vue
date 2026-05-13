<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import type { Event } from '~/types/event'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const topEvents = ref<Event[]>([])
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Duck's Club" />
    </template>
  </BaseHeader>

  <main class="relative z-10 space-y-5 px-4 pb-6 pt-4">
    <HomeHero />

    <section v-if="topEvents.length" class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
          Ближайшие события
        </h3>

        <NuxtLink to="/events" class="text-[11px] font-medium text-(--accent)"> Все </NuxtLink>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <HomeEventCard v-for="e in topEvents" :key="e.id" :event="e" />
      </div>
    </section>

    <HomeNavigation />
    <HomeFooter class="mt-2" />
  </main>
</template>
