<script setup lang="ts">
const contacts = [
  {
    label: 'Написать в Telegram',
    sub: 'Ответ за 5 минут',
    icon: '🤖',
    link: 'https://t.me/ducks_club_support',
  },
  {
    label: 'Позвонить в клуб',
    sub: '+7 (999) 123-45-67',
    icon: '📞',
    link: 'tel:+79991234567',
  },
  {
    label: 'Часто задаваемые вопросы',
    sub: 'База знаний',
    icon: '❓',
    link: '/faq',
  },
]
</script>

<template>
  <div class="min-h-screen">
    <LayoutHeader> ПОДДЕРЖКА </LayoutHeader>

    <div class="space-y-3 p-6">
      <NuxtLink
        v-for="contact in contacts"
        :key="contact.label"
        class="bg-[#1A1A1A] p-5 rounded-xl border border-white/5 flex items-center gap-4 active:scale-95 transition-all cursor-pointer"
        :to="contact.link"
      >
        <span class="text-3xl">{{ contact.icon }}</span>
        <div class="grow text-left">
          <p class="font-bold text-sm uppercase leading-tight">{{ contact.label }}</p>
          <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {{ contact.sub }}
          </p>
        </div>
        <span class="text-(--logo-bg)">→</span>
      </NuxtLink>
    </div>
  </div>
</template>
