<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const phone = '+70000000000'
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

  <div class="space-y-4 p-4 pb-24">
    <!-- HERO -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
      <div class="flex items-center gap-4">
        <div
          class="flex size-12 items-center justify-center rounded-2xl bg-(--logo-bg)/10 text-(--logo-bg)"
        >
          📍
        </div>

        <div>
          <h2 class="text-lg font-semibold">DUCK’S GameClub</h2>
          <p class="text-xs tracking-widest text-gray-500 uppercase">Location</p>
        </div>
      </div>

      <p class="mt-4 text-sm leading-relaxed text-gray-300">
        Москва, проспект Мира, 102с25
        <br />
        Бизнес-парк «Парк Мира»
      </p>

      <div class="mt-5 grid grid-cols-2 gap-3">
        <a
          href="https://maps.google.com/?q=Москва,+проспект+Мира,+102с25"
          target="_blank"
          class="rounded-2xl border border-white/5 bg-white/5 p-3 text-center text-sm"
        >
          📍 Карта
        </a>

        <a
          :href="`tel:${phone}`"
          class="rounded-2xl border border-(--logo-bg)/10 bg-(--logo-bg)/10 p-3 text-center text-sm text-(--logo-bg)"
        >
          📞 Позвонить
        </a>
      </div>
    </div>

    <!-- METRO -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
      <div class="mb-3 flex items-center gap-2 text-gray-400">
        <span class="text-(--logo-bg)">🚇</span>
        <span class="text-xs font-bold uppercase tracking-widest"> На метро </span>
      </div>

      <p class="text-sm leading-relaxed text-gray-300">
        Станция
        <span class="text-white">«Алексеевская»</span>.
        <br />
        Идите по проспекту Мира в сторону центра.
      </p>

      <div class="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-gray-300">
        ⏱ Пешком около 10 минут
      </div>
    </div>

    <!-- TRANSPORT -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
      <div class="mb-3 flex items-center gap-2 text-gray-400">
        <span class="text-(--logo-bg)">🚌</span>
        <span class="text-xs font-bold uppercase tracking-widest"> Транспорт </span>
      </div>

      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="rounded-2xl bg-white/5 p-3">
          <p class="text-xs text-gray-500 uppercase">Трамваи</p>
          <p class="mt-2 text-gray-200">7 · 11 · 25</p>
        </div>

        <div class="rounded-2xl bg-white/5 p-3">
          <p class="text-xs text-gray-500 uppercase">Автобусы</p>
          <p class="mt-2 text-gray-200">М2 · М9 · 85</p>
        </div>
      </div>

      <div class="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-gray-300">
        🚏 Остановка «Улица Павла Корчагина»
      </div>
    </div>

    <!-- PARKING -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
      <div class="mb-3 flex items-center gap-2 text-gray-400">
        <span class="text-(--logo-bg)">🚗</span>
        <span class="text-xs font-bold uppercase tracking-widest"> Парковка </span>
      </div>

      <div class="space-y-3 text-sm">
        <div class="rounded-2xl bg-white/5 p-3 text-gray-300">🅿️ На территории — 180₽/час</div>

        <div class="rounded-2xl bg-white/5 p-3 text-gray-300">🏙 Городская — 0–80₽/час</div>

        <div class="rounded-2xl bg-white/5 p-3 text-gray-300">🚘 Во дворах — бесплатно</div>
      </div>
    </div>

    <!-- CONTACT -->
    <div
      class="rounded-3xl border border-(--logo-bg)/10 bg-linear-to-br from-(--logo-bg)/10 to-transparent p-6"
    >
      <h3 class="text-lg font-semibold">Нужна помощь?</h3>

      <p class="mt-2 text-sm text-gray-400">
        Позвоните или напишите нам — подскажем как быстрее добраться.
      </p>

      <a
        :href="`tel:${phone}`"
        class="mt-5 block rounded-2xl bg-(--logo-bg) p-4 text-center text-sm font-semibold text-white"
      >
        📞 {{ phone }}
      </a>
    </div>
  </div>
</template>
