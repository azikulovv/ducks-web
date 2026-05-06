import type { EventResponse, EventsResponse, UpdateEventParams, UpdateEventPayload } from '~/types/events'

export type GetEventsParams = {
  gameType?: string
}

export function useEventsApi() {
  const api = useApi()

  const getEvents = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/events', {
      method: 'GET',
      query: params,
    })
  }

  const getEvent = (id: string) => {
    return api.request<EventResponse>(`/events/${id}`, {
      method: 'GET',
    })
  }

  const updateEvent = (params: UpdateEventParams, payload: UpdateEventPayload) => {
    return api.request<EventResponse>(`/events/${params.id}`, {
      method: 'PATCH',
      body: payload
    })
  }

  return {
    getEvent,
    getEvents,
    updateEvent
  }
}
