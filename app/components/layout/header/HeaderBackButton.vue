<script setup lang="ts">
import { ChevronLeft } from '@lucide/vue'

const router = useRouter()
const goBack = () => router.back()
</script>

<template>
  <button
    class="group flex items-center gap-1 text-red-400 transition-all active:scale-95"
    @click="goBack"
  >
    <ChevronLeft
      :size="18"
      class="transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-red-300"
    />

    <span
      class="text-[10px] font-bold uppercase tracking-[0.18em] transition-colors group-hover:text-red-200"
    >
      Назад
    </span>
  </button>
</template>
