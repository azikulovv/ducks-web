<template>
  <div
    class="min-h-screen flex flex-col bg-(--bg) text-white font-sans"
    :style="{ paddingTop: 'var(--safe-top)' }"
  >
    <slot />
  </div>
</template>
