<script setup lang="ts">
import { Calendar, CalendarCheck, CornerDownLeft, MessageSquare } from '@lucide/vue'
</script>

<template>
  <div class="bg-(--bg) min-h-screen text-white pb-20">
    <slot />

    <LayoutNavbar>
      <LayoutNavbarButton path="/events">
        <template #icon>
          <CornerDownLeft />
        </template>
        <template #default> Главная </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/events">
        <template #icon>
          <Calendar />
        </template>
        <template #default> События </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/active-events">
        <template #icon>
          <CalendarCheck />
        </template>
        <template #default> Активные </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/feedback">
        <template #icon>
          <MessageSquare />
        </template>
        <template #default> Feedback </template>
      </LayoutNavbarButton>
    </LayoutNavbar>
  </div>
</template>
