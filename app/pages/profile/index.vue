<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  middleware: 'auth',
})

const { user, logout, isAdmin } = useAuthStore()
const router = useRouter()

const menu = [
  { label: 'Идеи и предложения', path: '/profile/feedback' },
  { label: 'Мои записи', path: '/profile/events' },
  { label: 'О клубе', path: '/about' },
  { label: 'Настройки профиля', path: '/profile/settings' },
]

const go = (path: string) => {
  if (!path || path === '#') return
  router.push(path)
}

onMounted(async () => {
  await useAuthStore().fetchMe()
})
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Профиль" />
    </template>
  </BaseHeader>

  <div class="p-6 space-y-8">
    <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-8 text-center">
      <NuxtImg
        v-if="user?.avatarUrl"
        class="mx-auto flex size-24 items-center justify-center rounded-3xl border border-(--logo-bg)/30 bg-black select-none"
        :src="renderPicture(user.avatarUrl)"
      />
      <div
        v-else
        class="mx-auto flex size-24 items-center justify-center rounded-3xl border border-(--logo-bg)/30 bg-black text-4xl font-black"
      >
        {{ getInitial(user?.name) }}
      </div>

      <h2 class="mt-4 text-xl font-black uppercase tracking-wide">
        {{ user?.name }}
      </h2>

      <p class="mt-1 text-[10px] font-bold tracking-[0.25em] text-(--logo-bg)">
        ID: {{ user?.id }}
      </p>
    </div>

    <div class="space-y-3">
      <p class="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Рейтинг</p>

      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="s in user?.ratings"
          :key="s.gameType"
          class="relative rounded-2xl border border-white/5 bg-(--secondary)/20 p-4"
        >
          <div
            class="relative text-center text-[10px] font-black uppercase tracking-widest text-gray-500"
          >
            {{ getGameLabel(s.gameType) }}
          </div>

          <div class="relative text-center mt-1 text-2xl font-black text-(--logo-bg)">
            {{ s.points }}
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <p class="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Навигация</p>

      <button
        v-if="isAdmin"
        @click="go('/admin/events')"
        class="flex w-full items-center justify-between rounded-3xl border border-white/5 bg-(--secondary)/20 px-5 py-4 transition hover:bg-white/5 hover:border-(--logo-bg)/30 active:scale-[0.98]"
      >
        <span class="text-xs font-black uppercase tracking-wider"> Кабинет админа </span>
        <span class="text-(--logo-bg)">→</span>
      </button>

      <button
        v-for="btn in menu"
        :key="btn.label"
        @click="go(btn.path)"
        class="flex w-full items-center justify-between rounded-3xl border border-white/5 bg-(--secondary)/20 px-5 py-4 transition hover:bg-white/5 hover:border-(--logo-bg)/30 active:scale-[0.98]"
      >
        <span class="text-xs font-black uppercase tracking-wider">
          {{ btn.label }}
        </span>
        <span class="text-(--logo-bg)">→</span>
      </button>

      <BaseButton @click="logout"> Выйти </BaseButton>
    </div>
  </div>
</template>
