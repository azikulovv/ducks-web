import type {
  CreateEventPayload,
  EventResponse,
  EventsResponse,
  ReorderParticipantsPayload,
  UpdateEventParams,
  UpdateEventPayload,
} from '~/types/events'

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

  const getMyEvents = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/events/me', {
      method: 'GET',
      query: params,
    })
  }

  const getActiveEventsNow = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/events/active-now', {
      method: 'GET',
      query: params,
    })
  }

  const getEventParticipants = (eventId: string) => {
    return api.request<EventsResponse>(`/events/${eventId}/participants`, {
      method: 'GET',
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
      body: payload,
    })
  }

  const reorderParticipants = (eventId: string, payload: ReorderParticipantsPayload) => {
    return api.request(`/events/${eventId}/participants/reorder`, {
      method: 'PATCH',
      body: payload,
    })
  }

  const createEvent = (payload: CreateEventPayload) => {
    return api.request<EventResponse>(`/events`, {
      method: 'POST',
      body: payload,
    })
  }

  return {
    getEvent,
    getEvents,
    getMyEvents,
    getActiveEventsNow,
    getEventParticipants,
    reorderParticipants,
    updateEvent,
    createEvent,
  }
}
