<script setup lang="ts">
import { ChevronDown, GraduationCap } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Information from '~/components/ui/Information.vue'

type Step = {
  key: string
  title: string
  desc: string
}

const { impact } = useTelegramHaptics()

const opened = ref<string | null>(null)

const toggle = (key: string) => {
  opened.value = opened.value === key ? null : key
}

const steps: Step[] = [
  {
    key: 'regular',
    title: 'REGULAR FISH',
    desc: 'Базовый уровень. Игрок понимает правила покера, комбинации и основы принятия решений за столом. Основной фокус — минимизация ошибок и обучение дисциплине.',
  },
  {
    key: 'senior',
    title: 'Senior FISH',
    desc: 'Игрок уже знаком с базовой стратегией. Начинается работа над диапазонами рук, позиционной игрой и чтением оппонентов. Формируется фундамент стратегии.',
  },
  {
    key: 'middle',
    title: 'Middle FISH',
    desc: 'Средний уровень. Игрок активно работает над математикой покера: пот-оддсы, EV, баланс диапазонов. Вводится продвинутая постфлоп игра.',
  },
  {
    key: 'profi',
    title: 'PROFI Junior FISH',
    desc: 'Почти профессиональный уровень. Углублённая стратегия, эксплуатация оппонентов, GTO основы, работа с анализом раздач и софтом. Подготовка к профессиональной игре.',
  },
]

const goToEvents = () => {
  impact('light')
  navigateTo('/events')
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Обучение" />
    </template>
  </BaseHeader>

  <div class="p-6">
    <!-- INTRO -->
    <div class="mb-6 overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20">
      <div class="p-5">
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 shadow-[0_0_16px_rgba(239,68,68,0.12)]"
        >
          <GraduationCap :size="22" />
        </div>

        <h1 class="text-xl font-black text-white">Курс обучения покеру</h1>

        <p class="mt-2 text-sm leading-relaxed text-gray-400">
          На базе нашего клуба доступен структурированный курс обучения покеру, состоящий из 4
          ступеней — от базового понимания игры до профессионального уровня.
        </p>

        <div
          class="mt-4 inline-flex rounded-xl border border-red-500/10 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200"
        >
          4 ступени • BASE → PROFI
        </div>
      </div>
    </div>

    <!-- STEPS -->
    <div class="space-y-3">
      <button
        v-for="(step, index) in steps"
        :key="step.key"
        class="group w-full overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20 text-left transition-all duration-200 hover:border-red-500/20 hover:bg-(--secondary)/30"
        @click="toggle(step.key)"
      >
        <!-- HEADER -->
        <div class="flex items-center gap-4 p-4">
          <!-- NUMBER -->
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-black text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.10)]"
          >
            {{ index + 1 }}
          </div>

          <!-- TITLE -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-white transition-colors group-hover:text-red-100">
              {{ step.title }}
            </h3>
          </div>

          <!-- ICON -->
          <ChevronDown
            :size="18"
            class="text-gray-500 transition-all duration-300"
            :class="{
              'rotate-180 text-red-300': opened === step.key,
            }"
          />
        </div>

        <!-- CONTENT -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[300px]"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 max-h-[300px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="opened === step.key" class="border-t border-white/5 px-4 pb-4 pt-3">
            <p class="text-sm leading-relaxed text-gray-300">
              {{ step.desc }}
            </p>
          </div>
        </Transition>
      </button>
    </div>

    <!-- CTA -->
    <BaseButton class="mt-6 w-full" @click="goToEvents"> Смотреть события </BaseButton>

    <Information class="mt-4">
      Информация о ближайших обучениях будет публиковаться в афише.
    </Information>
  </div>
</template>
