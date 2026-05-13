<script setup lang="ts">
import type { Event, EventGameType } from '~/types/event'

type EventGameTypeStyle = {
  text: string
  glow: string
  gradient: string
  ring: string
  icon: string
}

const props = defineProps<{
  event: Event
}>()

const styles = computed(() => {
  const map: Record<EventGameType, EventGameTypeStyle> = {
    quiz: {
      text: 'text-violet-200',
      glow: 'bg-violet-500/20',
      gradient: 'from-violet-500/25 via-violet-500/10 to-transparent',
      ring: 'border-violet-500/20',
      icon: '🧠',
    },

    mafia: {
      text: 'text-zinc-200',
      glow: 'bg-zinc-500/20',
      gradient: 'from-zinc-400/25 via-zinc-400/10 to-transparent',
      ring: 'border-zinc-400/20',
      icon: '🎭',
    },

    poker: {
      text: 'text-red-200',
      glow: 'bg-red-500/25',
      gradient: 'from-[color:var(--logo-bg)]/30 via-[color:var(--logo-bg)]/10 to-transparent',
      ring: 'border-[color:var(--logo-bg)]/25',
      icon: '♠',
    },

    darts: {
      text: 'text-sky-200',
      glow: 'bg-sky-500/20',
      gradient: 'from-sky-500/25 via-sky-500/10 to-transparent',
      ring: 'border-sky-500/20',
      icon: '🎯',
    },

    pool: {
      text: 'text-emerald-200',
      glow: 'bg-emerald-500/20',
      gradient: 'from-emerald-500/25 via-emerald-500/10 to-transparent',
      ring: 'border-emerald-500/20',
      icon: '🎱',
    },
  }

  return map[props.event.gameType]
})
</script>

<template>
  <NuxtLink
    to="/events"
    class="relative overflow-hidden rounded-2xl border bg-white/3 p-4 backdrop-blur-xl transition active:scale-[0.98]"
    :class="styles.ring"
  >
    <div
      class="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-70"
      :class="styles.glow"
    />

    <div class="absolute inset-0 bg-linear-to-br" :class="styles.gradient" />

    <div class="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

    <div class="relative z-10">
      <div class="flex items-center justify-between">
        <span class="text-lg">
          {{ styles.icon }}
        </span>

        <span class="text-[10px] text-white/30 tracking-wider"> LIVE </span>
      </div>

      <p class="mt-3 text-sm font-semibold tracking-[-0.01em]" :class="styles.text">
        {{ event.address }}
      </p>

      <p class="text-[11px] text-gray-400">
        {{
          formatDate(event.startsAt, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
        }}
      </p>
    </div>
  </NuxtLink>
</template>
