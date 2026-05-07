import type {
  CreateFeedbackPayload,
  CreateFeedbackResponse,
  GetFeedbackResponse,
} from '~/types/feedback'

export function useFeedbackApi() {
  const api = useApi()

  const getFeedback = () => {
    return api.request<GetFeedbackResponse>('/feedback', {
      method: 'GET',
    })
  }

  const createFeedback = (payload: CreateFeedbackPayload) => {
    return api.request<CreateFeedbackResponse>(`/feedback`, {
      method: 'POST',
      body: payload,
    })
  }

  const deleteFeedback = (id: string) => {
    return api.request(`/feedback/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getFeedback,
    createFeedback,
    deleteFeedback,
  }
}
