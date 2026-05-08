<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { Send, Phone, HelpCircle } from '@lucide/vue'

const contacts = [
  {
    label: 'Написать в Telegram',
    sub: 'Ответ за 5 минут',
    icon: Send,
    link: 'https://t.me/ducks_club_support',
  },
  {
    label: 'Позвонить в клуб',
    sub: '+7 (999) 123-45-67',
    icon: Phone,
    link: 'tel:+79991234567',
  },
  {
    label: 'Часто задаваемые вопросы',
    sub: 'База знаний',
    icon: HelpCircle,
    link: '/support/faq',
  },
]
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Поддержка" />
    </template>
  </BaseHeader>

  <div class="space-y-3 p-6">
    <NuxtLink
      v-for="contact in contacts"
      :key="contact.label"
      :to="contact.link"
      class="group flex items-center gap-4 rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 transition-all active:scale-[0.98] hover:border-(--logo-bg)/30 hover:bg-white/5"
    >
      <!-- ICON -->
      <div
        class="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-(--logo-bg) transition group-hover:border-(--logo-bg)/40"
      >
        <component :is="contact.icon" :size="18" />
      </div>

      <!-- TEXT -->
      <div class="flex-1 text-left min-w-0">
        <p class="text-sm font-bold uppercase leading-tight truncate">
          {{ contact.label }}
        </p>

        <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          {{ contact.sub }}
        </p>
      </div>

      <!-- ARROW -->
      <span class="text-(--logo-bg) transition group-hover:translate-x-1"> → </span>
    </NuxtLink>
  </div>
</template>
