<script setup lang="ts">
import {
  Check,
  Copy,
  Link2,
  Loader2,
  Plus,
  Power,
  RefreshCw,
  X,
} from '@lucide/vue'
import { usePromoLinksApi, type PromoLink } from '~/api/promoLinksApi'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const notify = useNotify()
const { getPromoLinks, createPromoLink, updatePromoLink } = usePromoLinksApi()

const promoLinks = ref<PromoLink[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')
const isCreateModalOpen = ref(false)
const copiedCode = ref('')
const togglingIds = ref<Set<string>>(new Set())

const form = reactive({
  name: '',
  code: '',
})

const fetchPromoLinks = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    promoLinks.value = await getPromoLinks()
  } catch (error: any) {
    errorMessage.value = error?.data?.message || error?.error || 'Ошибка загрузки промо-ссылок'
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.name = ''
  form.code = ''
}

const openCreateModal = () => {
  resetForm()
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  if (isSubmitting.value) return

  isCreateModalOpen.value = false
}

const createLink = async () => {
  const name = form.name.trim()
  const code = form.code.trim()

  if (!name) {
    notify.error('Введите название ссылки')
    return
  }

  isSubmitting.value = true

  try {
    const createdLink = await createPromoLink({
      name,
      ...(code ? { code } : {}),
    })

    isCreateModalOpen.value = false
    resetForm()
    await fetchPromoLinks()
    notify.success('Промо-ссылка создана')

    if (createdLink?.url) {
      await copyLink(createdLink)
    }
  } catch (error: any) {
    notify.error(error?.data?.message || error?.error || 'Ошибка создания ссылки')
  } finally {
    isSubmitting.value = false
  }
}

const copyLink = async (link: PromoLink) => {
  try {
    await navigator.clipboard.writeText(link.url)
    copiedCode.value = link.code
    notify.success('Скопировано')

    setTimeout(() => {
      if (copiedCode.value === link.code) {
        copiedCode.value = ''
      }
    }, 1800)
  } catch {
    notify.error('Не удалось скопировать ссылку')
  }
}

const toggleActive = async (link: PromoLink) => {
  const nextValue = !link.isActive
  const nextSet = new Set(togglingIds.value)
  nextSet.add(link.id)
  togglingIds.value = nextSet

  try {
    const updated = await updatePromoLink(link.id, {
      isActive: nextValue,
    })

    promoLinks.value = promoLinks.value.map((item) => (item.id === link.id ? updated : item))
    notify.success(nextValue ? 'Ссылка активирована' : 'Ссылка отключена')
  } catch (error: any) {
    notify.error(error?.data?.message || error?.error || 'Ошибка обновления статуса')
  } finally {
    const currentSet = new Set(togglingIds.value)
    currentSet.delete(link.id)
    togglingIds.value = currentSet
  }
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

const formatConversion = (value: number) => `${Number(value || 0).toFixed(2)}%`

onMounted(fetchPromoLinks)
</script>

<template>
  <BaseHeader>
    <template #left> </template>

    <template #default>
      <HeaderTitle title="Промо-ссылки" />
    </template>

    <template #right>
      <button
        class="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--logo-bg) text-white transition hover:opacity-90 active:scale-95"
        type="button"
        aria-label="Создать ссылку"
        @click="openCreateModal"
      >
        <Plus class="h-5 w-5" />
      </button>
    </template>
  </BaseHeader>

  <main class="space-y-6 p-4 sm:p-6">
    <section class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="max-w-2xl">
        <h1 class="text-2xl font-bold text-white">Промо-ссылки</h1>

        <p class="mt-2 text-sm leading-relaxed text-gray-400">
          Создавайте ссылки для рекламы, Telegram-чатов и каналов. Система будет считать переходы
          и регистрации по каждому источнику.
        </p>
      </div>

      <button
        class="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--logo-bg) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
        type="button"
        @click="openCreateModal"
      >
        <Plus class="h-4 w-4" />
        Создать ссылку
      </button>
    </section>

    <section v-if="isLoading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="h-24 animate-pulse rounded-2xl bg-(--secondary)/20" />
    </section>

    <section
      v-else-if="errorMessage"
      class="rounded-2xl border border-(--warning)/20 bg-(--warning)/5 p-6 text-center"
    >
      <p class="text-sm text-(--warning)">{{ errorMessage }}</p>

      <button
        class="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5"
        type="button"
        @click="fetchPromoLinks"
      >
        <RefreshCw class="h-4 w-4" />
        Повторить
      </button>
    </section>

    <section
      v-else-if="!promoLinks.length"
      class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 px-6 py-20 text-center"
    >
      <Link2 class="h-10 w-10 text-gray-500" />

      <p class="mt-4 text-lg font-medium text-white">Промо-ссылок пока нет</p>

      <p class="mt-2 max-w-sm text-sm text-gray-400">
        Создайте первую ссылку для рекламы или Telegram-источника.
      </p>

      <button
        class="mt-5 inline-flex items-center gap-2 rounded-2xl bg-(--logo-bg) px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        type="button"
        @click="openCreateModal"
      >
        <Plus class="h-4 w-4" />
        Создать ссылку
      </button>
    </section>

    <section v-else>
      <div class="hidden overflow-hidden rounded-2xl border border-white/10 md:block">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-white/5 text-xs uppercase text-gray-400">
            <tr>
              <th class="px-4 py-3 font-semibold">Название</th>
              <th class="px-4 py-3 font-semibold">Code</th>
              <th class="px-4 py-3 font-semibold">Ссылка</th>
              <th class="px-4 py-3 font-semibold">Переходы</th>
              <th class="px-4 py-3 font-semibold">Регистрации</th>
              <th class="px-4 py-3 font-semibold">Конверсия</th>
              <th class="px-4 py-3 font-semibold">Статус</th>
              <th class="px-4 py-3 font-semibold">Создана</th>
              <th class="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>

          <tbody class="divide-y divide-white/10">
            <tr v-for="link in promoLinks" :key="link.id" class="bg-(--secondary)/10">
              <td class="max-w-44 px-4 py-4 font-medium text-white">
                <span class="line-clamp-2">{{ link.name }}</span>
              </td>

              <td class="px-4 py-4 font-mono text-xs text-gray-300">{{ link.code }}</td>

              <td class="max-w-64 px-4 py-4">
                <span class="block truncate text-xs text-gray-400">{{ link.url }}</span>
              </td>

              <td class="px-4 py-4 text-white">{{ link.clicksCount }}</td>
              <td class="px-4 py-4 text-white">{{ link.registrationsCount }}</td>
              <td class="px-4 py-4 text-white">{{ formatConversion(link.conversionRate) }}</td>

              <td class="px-4 py-4">
                <button
                  class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
                  :class="
                    link.isActive
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                      : 'border-white/10 bg-white/5 text-gray-400'
                  "
                  type="button"
                  :disabled="togglingIds.has(link.id)"
                  @click="toggleActive(link)"
                >
                  <Loader2 v-if="togglingIds.has(link.id)" class="h-3.5 w-3.5 animate-spin" />
                  <Power v-else class="h-3.5 w-3.5" />
                  {{ link.isActive ? 'Активна' : 'Неактивна' }}
                </button>
              </td>

              <td class="px-4 py-4 text-xs text-gray-400">{{ formatDate(link.createdAt) }}</td>

              <td class="px-4 py-4">
                <button
                  class="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/5"
                  type="button"
                  @click="copyLink(link)"
                >
                  <Check v-if="copiedCode === link.code" class="h-4 w-4 text-emerald-300" />
                  <Copy v-else class="h-4 w-4" />
                  {{ copiedCode === link.code ? 'Скопировано' : 'Скопировать' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="space-y-3 md:hidden">
        <article
          v-for="link in promoLinks"
          :key="link.id"
          class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h2 class="line-clamp-2 text-base font-semibold text-white">{{ link.name }}</h2>

              <p class="mt-1 font-mono text-xs text-gray-400">{{ link.code }}</p>
            </div>

            <button
              class="shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
              :class="
                link.isActive
                  ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                  : 'border-white/10 bg-white/5 text-gray-400'
              "
              type="button"
              :disabled="togglingIds.has(link.id)"
              @click="toggleActive(link)"
            >
              {{ link.isActive ? 'Активна' : 'Неактивна' }}
            </button>
          </div>

          <p class="mt-3 truncate rounded-xl bg-black/20 px-3 py-2 text-xs text-gray-300">
            {{ link.url }}
          </p>

          <dl class="mt-4 grid grid-cols-3 gap-2 text-center">
            <div class="rounded-xl bg-white/5 p-3">
              <dt class="text-[11px] text-gray-500">Переходы</dt>
              <dd class="mt-1 text-sm font-semibold text-white">{{ link.clicksCount }}</dd>
            </div>

            <div class="rounded-xl bg-white/5 p-3">
              <dt class="text-[11px] text-gray-500">Регистрации</dt>
              <dd class="mt-1 text-sm font-semibold text-white">{{ link.registrationsCount }}</dd>
            </div>

            <div class="rounded-xl bg-white/5 p-3">
              <dt class="text-[11px] text-gray-500">Конверсия</dt>
              <dd class="mt-1 text-sm font-semibold text-white">
                {{ formatConversion(link.conversionRate) }}
              </dd>
            </div>
          </dl>

          <div class="mt-4 flex items-center justify-between gap-3">
            <span class="text-xs text-gray-500">{{ formatDate(link.createdAt) }}</span>

            <button
              class="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/5"
              type="button"
              @click="copyLink(link)"
            >
              <Check v-if="copiedCode === link.code" class="h-4 w-4 text-emerald-300" />
              <Copy v-else class="h-4 w-4" />
              {{ copiedCode === link.code ? 'Скопировано' : 'Скопировать' }}
            </button>
          </div>
        </article>
      </div>
    </section>
  </main>

  <Teleport to="body">
    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 z-50 flex items-end bg-black/70 p-4 sm:items-center sm:justify-center"
      @click.self="closeCreateModal"
    >
      <form
        class="w-full rounded-3xl border border-white/10 bg-(--bg) p-5 shadow-2xl sm:max-w-md"
        @submit.prevent="createLink"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold text-white">Создать ссылку</h2>

            <p class="mt-1 text-sm text-gray-400">
              Если code оставить пустым, backend создаст его автоматически.
            </p>
          </div>

          <button
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:bg-white/5"
            type="button"
            :disabled="isSubmitting"
            aria-label="Закрыть"
            @click="closeCreateModal"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-5 space-y-4">
          <label class="block">
            <span class="text-xs font-semibold uppercase text-gray-400">Название ссылки</span>
            <input
              v-model="form.name"
              class="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-(--accent)"
              type="text"
              placeholder="Telegram канал"
              :disabled="isSubmitting"
              autocomplete="off"
            />
          </label>

          <label class="block">
            <span class="text-xs font-semibold uppercase text-gray-400">Code, optional</span>
            <input
              v-model="form.code"
              class="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-(--accent)"
              type="text"
              placeholder="tg_channel_01"
              :disabled="isSubmitting"
              autocomplete="off"
            />
          </label>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            class="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            :disabled="isSubmitting"
            @click="closeCreateModal"
          >
            Отмена
          </button>

          <button
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--logo-bg) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            :disabled="isSubmitting"
          >
            <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" />
            Создать
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>
