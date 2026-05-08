<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Правила" />
    </template>
  </BaseHeader>

  <div class="p-6">
    <div class="space-y-4">
      <div
        v-for="(rule, index) in rules"
        :key="index"
        class="group flex gap-4 p-4 rounded-2xl bg-(--secondary)/20 border border-white/5 transition-all duration-200 hover:bg-(--secondary)/30"
      >
        <!-- NUMBER -->
        <div
          class="shrink-0 w-9 h-9 rounded-xl bg-(--logo-bg)/5 border border-(--logo-bg)/20 flex items-center justify-center font-black text-sm text-(--logo-bg)"
        >
          {{ index + 1 }}
        </div>

        <!-- TEXT -->
        <p class="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
          {{ rule }}
        </p>
      </div>
    </div>

    <BaseButton> Полные правила PDF </BaseButton>
  </div>
</template>

<script setup>
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue';

const rules = [
  'Уважай других игроков и персонал',
  'Честная игра и спортивное поведение',
  'Запрещено употребление наркотиков',
  'Следуй указаниям администратора',
]
</script>
