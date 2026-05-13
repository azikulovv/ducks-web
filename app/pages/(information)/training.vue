<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Обучение" />
    </template>
  </BaseHeader>

  <div class="px-4 py-6 text-white">
    <!-- CATEGORIES -->
    <section class="grid grid-cols-2 gap-3 mb-6">
      <!-- BASE -->
      <NuxtLink
        to="/training/base"
        class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3backdrop-blur-xl active:scale-[0.98] transition"
      >
        <div class="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent" />

        <div class="relative z-10">
          <p class="text-sm font-bold">📘 База</p>
          <p class="text-[11px] text-gray-400 mt-1">Основы и правила игры</p>
        </div>
      </NuxtLink>

      <!-- TACTICS -->
      <NuxtLink
        to="/training/tactics"
        class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl active:scale-[0.98] transition"
      >
        <div
          class="absolute inset-0 bg-linear-to-br from-sky-500/20 via-sky-500/5 to-transparent"
        />

        <div class="relative z-10">
          <p class="text-sm font-bold">🎯 Тактика</p>
          <p class="text-[11px] text-gray-400 mt-1">Игровые решения и сценарии</p>
        </div>
      </NuxtLink>

      <!-- STRATEGY -->
      <NuxtLink
        to="/training/strategy"
        class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl active:scale-[0.98] transition"
      >
        <div
          class="absolute inset-0 bg-linear-to-br from-purple-500/20 via-purple-500/5 to-transparent"
        />

        <div class="relative z-10">
          <p class="text-sm font-bold">🧠 Стратегия</p>
          <p class="text-[11px] text-gray-400 mt-1">Долгосрочное мышление</p>
        </div>
      </NuxtLink>

      <!-- MECHANICS -->
      <NuxtLink
        to="/training/mechanics"
        class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl active:scale-[0.98] transition"
      >
        <div
          class="absolute inset-0 bg-linear-to-br from-emerald-500/20 via-emerald-500/5 to-transparent"
        />

        <div class="relative z-10">
          <p class="text-sm font-bold">🕹 Механика</p>
          <p class="text-[11px] text-gray-400 mt-1">Как работает система</p>
        </div>
      </NuxtLink>

      <!-- TOURNAMENTS -->
      <NuxtLink
        to="/training/tournaments"
        class="relative col-span-2 overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl active:scale-[0.98] transition"
      >
        <div
          class="absolute inset-0 bg-linear-to-br from-red-500/20 via-red-500/5 to-transparent"
        />

        <div class="relative z-10 flex items-center justify-between">
          <div>
            <p class="text-sm font-bold">🏆 Турниры</p>
            <p class="text-[11px] text-gray-400 mt-1">Система соревнований и правил</p>
          </div>

          <span class="text-red-300 text-lg">⚡</span>
        </div>
      </NuxtLink>
    </section>

    <!-- FEATURED GUIDES -->
    <section>
      <h2 class="text-lg font-bold mb-3">Быстрые гайды</h2>

      <div class="space-y-3">
        <div class="rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl">
          <p class="text-sm font-semibold">Как начать за 5 минут</p>
          <p class="text-[11px] text-gray-400 mt-1">Быстрый старт без лишних деталей</p>
        </div>

        <div class="rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl">
          <p class="text-sm font-semibold">10 ошибок новичков</p>
          <p class="text-[11px] text-gray-400 mt-1">Что мешает быстро прогрессировать</p>
        </div>

        <div class="rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl">
          <p class="text-sm font-semibold">Как быстро поднять уровень</p>
          <p class="text-[11px] text-gray-400 mt-1">Практические стратегии роста</p>
        </div>
      </div>
    </section>
  </div>
</template>
