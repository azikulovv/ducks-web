<script setup lang="ts">
import { MapPinPlus, User } from '@lucide/vue'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const router = useRouter()

const goToEvents = () => {
  router.push('/events')
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="О клубе" />
    </template>
  </BaseHeader>

  <div class="p-4 space-y-4 pb-24">
    <!-- HERO -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
      <div class="flex items-center gap-4">
        <div
          class="size-12 rounded-2xl bg-(--logo-bg)/10 flex items-center justify-center text-(--logo-bg)"
        >
          <User :size="24" />
        </div>

        <div>
          <h2 class="text-lg font-semibold">DUCK’S GameClub</h2>
          <p class="text-xs text-gray-500 tracking-widest">Gaming community</p>
        </div>
      </div>

      <p class="mt-4 text-sm text-gray-300 leading-relaxed">
        Игровое сообщество, созданное для общения, эмоций и соревновательной среды.
      </p>
    </div>

    <!-- SECTIONS GRID -->
    <div class="grid gap-3 md:grid-cols-2">
      <!-- HISTORY -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
        <div class="flex items-center gap-2 text-gray-400 mb-3">
          <span class="text-(--logo-bg)">⌛</span>
          <span class="text-xs font-bold uppercase tracking-widest">История</span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">
          Начинали как встречи друзей, выросли в платформу с турнирами и системой событий.
        </p>
      </div>

      <!-- MISSION -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
        <div class="flex items-center gap-2 text-gray-400 mb-3">
          <span class="text-(--logo-bg)">🎯</span>
          <span class="text-xs font-bold uppercase tracking-widest">Миссия</span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">
          Объединять людей через игры и создавать живое комьюнити.
        </p>
      </div>

      <!-- VALUES -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5 md:col-span-2">
        <div class="flex items-center gap-2 text-gray-400 mb-3">
          <span class="text-(--logo-bg)">⚡</span>
          <span class="text-xs font-bold uppercase tracking-widest">Ценности</span>
        </div>

        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="rounded-2xl bg-white/5 p-3">Комьюнити</div>
          <div class="rounded-2xl bg-white/5 p-3">Соревнование</div>
          <div class="rounded-2xl bg-white/5 p-3">Развитие</div>
          <div class="rounded-2xl bg-white/5 p-3">Эмоции</div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div
      class="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center"
    >
      <h3 class="text-lg font-semibold">Хочешь участвовать?</h3>
      <p class="mt-2 text-sm text-gray-400">Присоединяйся к ближайшим событиям</p>

      <BaseButton :variant="'secondary'" @click="goToEvents" class="mt-5 w-full">
        Смотреть события
      </BaseButton>
    </div>

    <!-- FRANCHISE -->
    <div class="rounded-3xl border border-(--logo-bg)/10 bg-(--logo-bg)/5 p-6">
      <div class="flex items-center gap-3">
        <div
          class="size-12 rounded-2xl bg-(--logo-bg)/10 flex items-center justify-center text-(--logo-bg)"
        >
          <MapPinPlus :size="24" />
        </div>

        <div>
          <h3 class="text-base font-semibold">Франшиза DUCK'S</h3>
          <p class="text-xs text-gray-500">Открой игровой клуб</p>
        </div>
      </div>

      <p class="mt-4 text-sm text-gray-300">
        Мы помогаем запускать игровые пространства и турниры.
      </p>

      <BaseButton class="mt-5 w-full"> Стать партнером </BaseButton>
    </div>
  </div>
</template>
