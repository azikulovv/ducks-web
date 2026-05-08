<script setup lang="ts">
import CalendarIcon from '~/components/icons/CalendarIcon.vue'
import StarIcon from '~/components/icons/StarIcon.vue'
import UserIcon from '~/components/icons/UserIcon.vue'
import ListIcon from '~/components/icons/ListIcon.vue'
import InfoIcon from '~/components/icons/InfoIcon.vue'
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white font-sans pb-20">
    <slot />

    <LayoutNavbar>
      <LayoutNavbarButton path="/events">
        <template #icon>
          <CalendarIcon />
        </template>
        <template #default> Афиша </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/rating">
        <template #icon>
          <StarIcon />
        </template>
        <template #default> Рейтинг </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/profile">
        <template #icon>
          <UserIcon />
        </template>
        <template #default> Профиль </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/rules">
        <template #icon>
          <ListIcon />
        </template>
        <template #default> Правила </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/support">
        <template #icon>
          <InfoIcon />
        </template>
        <template #default> Поддержка </template>
      </LayoutNavbarButton>
    </LayoutNavbar>
  </div>
</template>
