<template>
  <div class="min-h-screen">
    <LayoutHeader>ПРАВИЛА КЛУБА</LayoutHeader>

    <div class="p-6">
      <div class="space-y-4">
        <div
          v-for="(rule, index) in rules"
          :key="index"
          class="bg-[#1A1A1A] p-5 rounded-xl border border-white/5 flex gap-4"
        >
          <span class="text-(--logo-bg) font-black text-xl">{{ index + 1 }}</span>
          <p class="text-sm font-medium leading-relaxed mt-0.5">{{ rule }}</p>
        </div>
      </div>

      <BaseButton> Полные правила PDF </BaseButton>
    </div>
  </div>
</template>

<script setup>
const rules = [
  'Уважай других игроков и персонал',
  'Честная игра и спортивное поведение',
  'Запрещено употребление наркотиков',
  'Следуй указаниям администратора',
]
</script>
