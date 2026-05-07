<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, logout, isAdmin } = useAuth()

const menu = [
  { label: 'Идеи и предложения', path: '/ideas' },
  { label: 'Мои записи', path: '/subscriptions' },
  { label: 'Настройки профиля', path: '#' },
]
</script>

<template>
  <div class="min-h-screen p-6 pb-24 space-y-8">
    <div class="bg-(--secondary)/20 rounded-4xl p-8 text-center border border-white/5">
      <div
        class="w-24 h-24 bg-[#0F0F0F] rounded-xl mx-auto border-2 border-(--logo-bg) flex items-center justify-center text-5xl"
      >
        🕶️
      </div>

      <h2 class="text-2xl font-black mt-4 italic uppercase">{{ user?.name }}</h2>
      <p class="text-(--logo-bg) text-[10px] font-bold tracking-widest">ID: {{ user?.id }}</p>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <!-- <div
        v-for="s in user?.ratings"
        :key="s.label"
        class="bg-(--secondary)/20 p-4 rounded-2xl text-center border border-white/5"
      >
        <p class="text-[9px] text-gray-500 font-black uppercase italic">{{ s.label }}</p>
        <p class="text-xl font-black text-[#E11D48]">#{{ s.rank }}</p>
      </div> -->
      <div class="bg-(--secondary)/20 p-4 rounded-xl text-center border border-white/5">
        <p class="text-[9px] text-gray-500 font-black uppercase italic">Покер</p>
        <p class="text-xl font-black text-(--logo-bg)">-</p>
      </div>
      <div class="bg-(--secondary)/20 p-4 rounded-xl text-center border border-white/5">
        <p class="text-[9px] text-gray-500 font-black uppercase italic">Бильярд</p>
        <p class="text-xl font-black text-(--logo-bg)">-</p>
      </div>
      <div class="bg-(--secondary)/20 p-4 rounded-xl text-center border border-white/5">
        <p class="text-[9px] text-gray-500 font-black uppercase italic">Дартс</p>
        <p class="text-xl font-black text-(--logo-bg)">-</p>
      </div>
    </div>

    <div class="space-y-3">
      <button
        v-if="isAdmin"
        @click="navigateTo('/admin/events')"
        class="w-full bg-(--secondary)/20 px-5 py-3 rounded-xl flex justify-between items-center border border-white/5 active:bg-[#222] active:scale-[0.98] transition duration-200"
      >
        <span class="font-bold uppercase text-xs">{{ 'Кабинет админа' }}</span>
        <span class="text-(--logo-bg)">→</span>
      </button>

      <button
        v-for="btn in menu"
        :key="btn.label"
        @click="navigateTo(btn.path)"
        class="w-full bg-(--secondary)/20 px-5 py-3 rounded-xl flex justify-between items-center border border-white/5 active:bg-[#222] active:scale-[0.98] transition duration-200"
      >
        <span class="font-bold uppercase text-xs">{{ btn.label }}</span>
        <span class="text-(--logo-bg)">→</span>
      </button>

      <BaseButton @click="logout"> Выйти </BaseButton>
    </div>
  </div>
</template>
