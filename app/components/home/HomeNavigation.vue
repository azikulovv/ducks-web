<script lang="ts" setup></script>

<template>
  <section class="grid grid-cols-2 gap-3">
    <NuxtLink
      to="/about"
      class="relative col-span-2 overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-5 backdrop-blur-xl transition active:scale-[0.98]"
    >
      <div class="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent" />

      <div class="relative z-10">
        <h2 class="text-lg font-black tracking-[-0.02em] text-white">О клубе</h2>
        <p class="mt-1 text-sm text-gray-400">Атмосфера, правила и игровые направления DUCK’S</p>
      </div>
    </NuxtLink>

    <NuxtLink
      to="/location"
      class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl active:scale-[0.98] transition"
    >
      <div class="absolute inset-0 bg-linear-to-br from-sky-500/20 via-sky-500/5 to-transparent" />

      <div class="relative z-10 flex items-center justify-between">
        <div>
          <p class="text-sm font-bold text-white">Как нас найти</p>
          <p class="text-[11px] text-gray-400">Локация клуба</p>
        </div>
        <div class="text-sky-300 text-lg">📍</div>
      </div>
    </NuxtLink>

    <NuxtLink
      to="/support"
      class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl active:scale-[0.98] transition"
    >
      <div class="absolute inset-0 bg-linear-to-br from-red-500/20 via-red-500/5 to-transparent" />
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <p class="text-sm font-bold text-white">Поддержка</p>
          <p class="text-[11px] text-gray-400">Связь с админом</p>
        </div>
        <span class="text-red-300 text-lg">⚡</span>
      </div>
    </NuxtLink>

    <NuxtLink
      to="/training"
      class="relative col-span-2 overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-5 backdrop-blur-xl active:scale-[0.98] transition"
    >
      <div class="absolute inset-0 bg-linear-to-br from-red-500/20 via-red-500/5 to-transparent" />
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <p class="text-sm font-black text-red-200 uppercase tracking-wide">Обучение</p>
          <p class="text-[11px] text-gray-400">Гайды, правила, стратегия</p>
        </div>
        <span class="text-red-300 text-lg">📘</span>
      </div>
    </NuxtLink>
  </section>
</template>
