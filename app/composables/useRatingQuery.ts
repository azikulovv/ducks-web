import { ref, watch } from 'vue'
import type { Rating } from '~/types/rating'
import { useRatingApi } from '~/api/rating.api'

export function useRatingQuery(gameType: Ref<string>) {
  const rating = ref<Rating[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const api = useRatingApi()

  let requestId = 0

  const fetchRating = async () => {
    const current = ++requestId

    try {
      isLoading.value = true
      error.value = null

      const res = await api.getRating(gameType.value)

      if (current !== requestId) return

      rating.value = res.data
    } catch {
      if (current !== requestId) return

      error.value = 'Ошибка загрузки рейтинга'
    } finally {
      if (current === requestId) {
        isLoading.value = false
      }
    }
  }

  watch(gameType, fetchRating, { immediate: true })

  return {
    rating,
    isLoading,
    error,
    fetchRating,
  }
}
