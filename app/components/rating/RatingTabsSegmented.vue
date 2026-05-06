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

const container = ref<HTMLElement | null>(null)

const activeIndex = computed(() => props.items.findIndex((i) => i.value === props.modelValue))

const setActive = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div
    ref="container"
    class="relative bg-(--secondary)/20 p-1 rounded-2xl flex border border-white/5 overflow-hidden"
  >
    <!-- sliding indicator -->
    <div
      class="absolute top-1 bottom-1 left-1 w-[33.333333333333336%] rounded-xl bg-(--logo-bg) shadow-lg transition-transform duration-300 ease-out"
      :style="{
        transform: `translateX(${activeIndex * 100}%)`,
      }"
    />

    <button
      v-for="item in items"
      :key="item.value"
      @click="setActive(item.value)"
      class="relative z-10 flex-1 py-3 rounded-xl font-black text-xs uppercase transition-colors"
      :class="modelValue === item.value ? 'text-white' : 'text-gray-500'"
    >
      {{ item.label }}
    </button>
  </div>
</template>
