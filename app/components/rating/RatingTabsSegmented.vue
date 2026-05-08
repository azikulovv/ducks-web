<script setup lang="ts">
type Tab = {
  label: string
  value: string
}

const props = defineProps<{
  items: Tab[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeIndex = computed(() => props.items.findIndex((i) => i.value === props.modelValue))

const setActive = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div
    class="relative grid overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-1 backdrop-blur-xl"
    :style="{
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
    }"
  >
    <!-- индикатор активной вкладки -->
    <div
      class="absolute top-1 bottom-1 left-1 rounded-xl bg-white/5 transition-transform duration-300 ease-out"
      :style="{
        width: `calc((100% - 8px) / ${items.length})`,
        transform: `translateX(${activeIndex * 100}%)`,
      }"
    />

    <!-- табы -->
    <button
      v-for="item in items"
      :key="item.value"
      @click="setActive(item.value)"
      class="relative z-10 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors active:scale-95"
      :class="modelValue === item.value ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
    >
      {{ item.label }}
    </button>
  </div>
</template>
