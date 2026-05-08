<template>
  <div class="space-y-3 p-4">
    <div
      v-for="i in 4"
      :key="i"
      class="h-28 rounded-3xl bg-(--secondary)/20 animate-pulse border border-white/5"
    />
  </div>
</template>
