import type {
  GetContentsParams,
  GetContentsResponse,
  UpdateContentParams,
  UpdateContentPayload,
  UpdateContentResponse,
} from '~/types/api/content.types'

export function useEventsApi() {
  const api = useApi()

  const getContents = (params: GetContentsParams) => {
    return api.request<GetContentsResponse>(`/content/${params.key}`, {
      method: 'GET',
    })
  }

  const updateContent = (params: UpdateContentParams, payload: UpdateContentPayload) => {
    return api.request<UpdateContentResponse>(`/content/${params.key}`, {
      method: 'PATCH',
      body: payload,
    })
  }

  return { getContents, updateContent }
}
