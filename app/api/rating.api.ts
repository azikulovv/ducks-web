import type { RatingResponse } from '~/types/rating'

export function useRatingApi() {
  const api = useApi()

  const getRating = (gameType: string) => {
    return api.request<RatingResponse>(`/rating/${gameType}`, {
      method: 'GET',
    })
  }

  return {
    getRating,
  }
}
