<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, logout } = useAuth()

const menu = [
  { label: 'Идеи и предложения', path: '/ideas' },
  { label: 'Достижения', path: '#' },
  { label: 'Настройки профиля', path: '#' },
]
</script>

<template>
  <div class="min-h-screen p-6 space-y-8">
    <div class="bg-[#1A1A1A] rounded-4xl p-8 text-center border border-white/5">
      <div
        class="w-24 h-24 bg-[#0F0F0F] rounded-full mx-auto border-2 border-[#E11D48] flex items-center justify-center text-5xl"
      >
        🕶️
      </div>
      <h2 class="text-2xl font-black mt-4 italic uppercase">{{ user?.name }}</h2>
      <p class="text-[#E11D48] text-[10px] font-bold uppercase tracking-widest">
        ID: {{ user?.id }}
      </p>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <!-- <div
        v-for="s in user?.ratings"
        :key="s.label"
        class="bg-[#1A1A1A] p-4 rounded-2xl text-center border border-white/5"
      >
        <p class="text-[9px] text-gray-500 font-black uppercase italic">{{ s.label }}</p>
        <p class="text-xl font-black text-[#E11D48]">#{{ s.rank }}</p>
      </div> -->
      <div class="bg-[#1A1A1A] p-4 rounded-2xl text-center border border-white/5">
        <p class="text-[9px] text-gray-500 font-black uppercase italic">{{ 's.label' }}</p>
        <p class="text-xl font-black text-[#E11D48]">#{{ 's.rank' }}</p>
      </div>
      <div class="bg-[#1A1A1A] p-4 rounded-2xl text-center border border-white/5">
        <p class="text-[9px] text-gray-500 font-black uppercase italic">{{ 's.label' }}</p>
        <p class="text-xl font-black text-[#E11D48]">#{{ 's.rank' }}</p>
      </div>
      <div class="bg-[#1A1A1A] p-4 rounded-2xl text-center border border-white/5">
        <p class="text-[9px] text-gray-500 font-black uppercase italic">{{ 's.label' }}</p>
        <p class="text-xl font-black text-[#E11D48]">#{{ 's.rank' }}</p>
      </div>
    </div>

    <div class="space-y-3">
      <button
        v-for="btn in menu"
        :key="btn.label"
        @click="navigateTo(btn.path)"
        class="w-full bg-[#1A1A1A] p-5 rounded-xl flex justify-between items-center border border-white/5 active:bg-[#222]"
      >
        <span class="font-bold uppercase text-sm">{{ btn.label }}</span>
        <span class="text-[#E11D48]">→</span>
      </button>

      <BaseButton @click="logout"> Выйти </BaseButton>
    </div>
  </div>
</template>
