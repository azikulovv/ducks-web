<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
</script>

<template>
  <section class="relative overflow-hidden rounded-[34px] border border-white/10 bg-black">
    <div
      class="absolute inset-0 bg-cover bg-center scale-110 opacity-90"
      style="background-image: url('/assets/images/duck.jpg')"
    />

    <div class="absolute inset-0 bg-black/50" />
    <div class="absolute inset-0 bg-linear-to-b from-black/30 via-black/60 to-black" />
    <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-(--logo-bg)/10 blur-3xl" />

    <div class="relative z-10 p-6">
      <div
        class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-(--logo-bg) bg-(--logo-bg)/10 border border-(--logo-bg)/20"
      >
        АФИША
      </div>

      <h1
        class="mt-2 text-[30px] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white/80"
      >
        игровое пространство

        <span
          class="mt-1 block bg-(--logo-bg) text-[56px] font-anton font-black tracking-normal text-white w-fit px-2 py-1"
        >
          DUCK'S
        </span>
      </h1>

      <p class="mt-3 text-sm text-gray-400">Турниры, рейтинги и игровые вечера</p>

      <button
        @click="navigateTo('/events')"
        class="mt-4 flex items-center gap-2 rounded-2xl bg-white/90 text-black px-5 py-3 text-sm font-bold transition active:scale-[0.98] hover:bg-white"
      >
        Открыть афишу

        <ArrowUpRight :stroke-width="2.5" :size="20" />
      </button>
    </div>
  </section>
</template>
