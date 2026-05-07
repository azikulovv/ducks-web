<script setup lang="ts">
import NavEvents from '~/components/icons/NavEvents.vue'
import NavHome from '~/components/icons/NavHome.vue'
import NavUsers from '~/components/icons/NavProfile.vue'
import NavRating from '~/components/icons/NavRating.vue'

const route = useRoute()

const nav = [
  { label: 'Главная', path: '/events', icon: NavHome },
  { label: 'События', path: '/admin/events', icon: NavEvents },
  { label: 'Активные', path: '/admin/active-events', icon: NavEvents },
  // { label: 'Рейтинг', path: '/admin/rating', icon: NavRating },
]

const isActive = (path: string) => {
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="bg-(--bg) min-h-screen text-white">
    <slot />

    <nav
      class="fixed bottom-0 left-0 right-0 bg-(--bg)/60 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex z-40"
    >
      <NuxtLink
        v-for="item in nav"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1 gap-1 relative"
      >
        <!-- ACTIVE INDICATOR -->
        <div
          v-if="isActive(item.path)"
          class="absolute -top-1 w-6 h-0.5 bg-(--logo-bg) rounded-full"
        />

        <!-- ICON -->
        <component
          :is="item.icon"
          :class="[
            'transition-all duration-200',
            isActive(item.path) ? 'text-(--logo-bg) scale-110' : 'text-gray-600',
          ]"
        />

        <!-- LABEL -->
        <span
          :class="[
            'text-[9px] font-bold uppercase tracking-tight',
            isActive(item.path) ? 'text-(--logo-bg)' : 'text-gray-600',
          ]"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>
