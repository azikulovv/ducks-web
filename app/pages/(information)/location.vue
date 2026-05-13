<script setup lang="ts">
import BackButton from '~/components/BackButton.vue'
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
      <HeaderTitle title="Как нас найти" />
    </template>
  </BaseHeader>

  <div class="px-4 py-6 pt-4">
    <!-- HERO -->
    <section class="mb-6">
      <h1 class="text-2xl font-black">Как нас найти</h1>
      <p class="mt-1 text-sm text-gray-400">
        Мы находимся в удобной точке города — легко добраться пешком и на транспорте
      </p>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <a
          href="https://maps.google.com"
          target="_blank"
          class="rounded-2xl bg-white/5 p-4 text-center backdrop-blur-xl border border-white/5 active:scale-[0.98]"
        >
          📍 Карта
        </a>

        <a
          href="tel:+70000000000"
          class="rounded-2xl bg-white/5 p-4 text-center backdrop-blur-xl border border-white/5 active:scale-[0.98]"
        >
          📞 Позвонить
        </a>
      </div>
    </section>

    <!-- LOCATION CARD -->
    <section class="rounded-2xl border border-white/5 bg-white/3 p-5 backdrop-blur-xl mb-6">
      <h2 class="text-lg font-bold">📍 Адрес</h2>

      <p class="mt-2 text-sm text-gray-300">г. Темиртау, ул. Example 123</p>

      <p class="mt-2 text-sm text-gray-400">
        Ориентир: рядом с главным входом в торговый центр / кофейней
      </p>

      <div class="mt-4 text-xs text-green-400">● Сейчас открыто</div>
    </section>

    <!-- HOW TO GET -->
    <section class="mb-6">
      <h2 class="text-lg font-bold mb-3">Как добраться</h2>

      <div class="space-y-3">
        <div class="rounded-2xl bg-white/3 p-4 border border-white/5">
          🚶 Пешком — 5–10 минут от центра
        </div>

        <div class="rounded-2xl bg-white/3 p-4 border border-white/5">
          🚗 На машине — есть парковка рядом
        </div>

        <div class="rounded-2xl bg-white/3 p-4 border border-white/5">
          🚌 Автобусы: №1, №3, №7
        </div>
      </div>
    </section>

    <!-- MAP -->
    <section class="mb-6">
      <h2 class="text-lg font-bold mb-3">Карта</h2>

      <div class="rounded-2xl overflow-hidden border border-white/5">
        <iframe class="w-full h-64" src="https://www.google.com/maps/embed?pb=" loading="lazy" />
      </div>
    </section>

    <!-- CONTACTS -->
    <section class="rounded-2xl border border-white/5 bg-white/3 p-5 backdrop-blur-xl">
      <h2 class="text-lg font-bold">Контакты</h2>

      <div class="mt-3 space-y-2 text-sm text-gray-300">
        <p>Telegram: @ducks</p>
        <p>Phone: +7 000 000 00 00</p>
        <p>Instagram: @ducks</p>
      </div>
    </section>
  </div>
</template>
