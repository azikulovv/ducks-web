<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

type Item = {
  label: string
  value: string
}

const props = defineProps<{
  options: Item[]
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

const selected = computed(() => props.options.find((i) => i.value === props.modelValue))

const selectItem = (item: Item) => {
  emit('update:modelValue', item.value)
  isOpen.value = false
}
</script>

<template>
  <div ref="root" class="relative w-full">
    <button
      class="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 py-3 text-sm text-white transition-all duration-200 hover:border-white/10 hover:bg-white/6 active:scale-[0.99]"
      @click="isOpen = !isOpen"
    >
      <span class="truncate">
        {{ selected?.label ?? placeholder ?? 'Выберите' }}
      </span>

      <ChevronDown
        :size="16"
        class="text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/5 bg-[#14151c] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <button
          v-for="item in options"
          :key="item.value"
          class="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all"
          :class="
            item.value === modelValue
              ? 'bg-red-500/15 text-red-300 '
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          "
          @click="selectItem(item)"
        >
          {{ item.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>
