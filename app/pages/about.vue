<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth',
})

const router = useRouter()

const goToEvents = () => {
  router.push('/events')
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between p-4">
        <BackButton to="/profile" label="Назад" />
      </div>
    </div>

    <div class="mx-auto max-w-2xl space-y-6 p-4 pb-24">
      <!-- HERO -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
        <div class="flex items-center gap-4">
          <div class="flex size-14 items-center justify-center rounded-2xl bg-white/10">
            <!-- DUCK ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 4c0 1.5-1 3-3 3S8 5.5 8 4s1-3 3-3 3 1.5 3 3z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 21c0-5 4-9 9-9s9 4 9 9" />
            </svg>
          </div>

          <div>
            <h2 class="text-lg font-semibold">DUCK’S GameClub</h2>
            <p class="text-sm text-gray-400">Игровое комьюнити нового формата</p>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-300 leading-relaxed">
          Мы создаём пространство, где люди собираются не просто играть, а знакомиться,
          соревноваться и развиваться через игровые события.
        </p>
      </div>

      <!-- MISSION -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
        <div class="mb-4 flex items-center gap-3 text-gray-400">
          <!-- TARGET ICON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
          </svg>

          <span class="text-sm font-medium">Наша миссия</span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">
          Объединять людей через игровые события, создавать живое комьюнити и давать каждому
          участнику возможность почувствовать себя частью чего-то большего.
        </p>
      </div>

      <!-- FEATURES -->
      <div class="grid gap-3 md:grid-cols-2">
        <!-- CARD -->
        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <div class="flex items-center gap-3 text-gray-400">
            <!-- GAME ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h.01M15 12h.01M7 16h10M5 8h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
              />
            </svg>

            <span class="text-sm">Игры</span>
          </div>

          <p class="mt-3 text-sm text-gray-300">Poker, Darts, Board games и другие форматы</p>
        </div>

        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <div class="flex items-center gap-3 text-gray-400">
            <!-- USERS ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
              />
              <circle cx="9" cy="7" r="3" />
            </svg>

            <span class="text-sm">Комьюнити</span>
          </div>

          <p class="mt-3 text-sm text-gray-300">Люди, которые любят соревноваться и общаться</p>
        </div>

        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <div class="flex items-center gap-3 text-gray-400">
            <!-- STAR ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.36a1 1 0 00.95.69h6.7c.969 0 1.371 1.24.588 1.81l-5.42 3.94a1 1 0 00-.364 1.118l2.07 6.36c.3.921-.755 1.688-1.54 1.118l-5.42-3.94a1 1 0 00-1.175 0l-5.42 3.94c-.784.57-1.838-.197-1.539-1.118l2.07-6.36a1 1 0 00-.364-1.118l-5.42-3.94c-.783-.57-.38-1.81.588-1.81h6.7a1 1 0 00.95-.69l2.07-6.36z"
              />
            </svg>

            <span class="text-sm">Опыт</span>
          </div>

          <p class="mt-3 text-sm text-gray-300">Каждое событие — это эмоции и рейтинг</p>
        </div>

        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <div class="flex items-center gap-3 text-gray-400">
            <!-- LOCATION ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
              />
              <circle cx="12" cy="11" r="2.5" />
            </svg>

            <span class="text-sm">Локация</span>
          </div>

          <p class="mt-3 text-sm text-gray-300">DUCK’S GameClub — офлайн пространство</p>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center"
      >
        <h3 class="text-lg font-semibold">Присоединяйся к событиям</h3>

        <p class="mt-2 text-sm text-gray-400">Смотри афишу и участвуй в ближайших играх</p>

        <button
          class="mt-5 rounded-2xl bg-(--primary) px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="goToEvents"
        >
          Перейти к событиям
        </button>
      </div>
    </div>
  </div>
</template>
