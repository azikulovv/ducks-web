<script setup lang="ts">
import type { Rating } from '~/types/rating'

defineProps<{
  rating: Rating[]
}>()

const isMe = (id: string) => id === 'cmosiavmr000113jab6o2vh3j'
</script>

<template>
  <div
    class="mt-4 grid grid-cols-12 px-4 mb-2 text-[10px] font-black text-gray-600 uppercase tracking-widest"
  >
    <div class="col-span-2">Поз.</div>
    <div class="col-span-7">Никнейм</div>
    <div class="col-span-3 text-right">Очки</div>
  </div>

  <div class="space-y-2">
    <div
      v-for="(item, index) in rating"
      :key="item.id"
      :class="[
        'grid grid-cols-12 items-center p-4 rounded-2xl border transition-all',
        isMe(item.user.id)
          ? 'bg-(--logo-bg)/10 border-(--logo-bg)/30'
          : 'bg-(--secondary)/20 border-white/5',
      ]"
    >
      <!-- position -->
      <div
        class="col-span-2 font-black"
        :class="index < 3 ? 'text-(--logo-bg) text-lg' : 'text-gray-500'"
      >
        {{ index + 1 }}
      </div>

      <!-- user -->
      <div class="col-span-7 flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-full bg-(--bg) flex items-center justify-center border border-white/10 text-xs shadow-inner"
        >
          <!-- {{ item.user.name ?? '👤' }} -->
          {{ '👤' }}
        </div>

        <span
          :class="[
            'font-bold text-sm  tracking-tight',
            isMe(item.user.id) ? 'text-white' : 'text-gray-300',
          ]"
        >
          {{ item.user.name }}
        </span>
      </div>

      <!-- score -->
      <div
        class="col-span-3 text-right font-black"
        :class="isMe(item.user.id) ? 'text-(--logo-bg)' : 'text-white'"
      >
        {{ item.points }}
      </div>
    </div>
  </div>
</template>
