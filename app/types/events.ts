export type Event = {
  id: string
  imageUrl: string
  imageHash: string
  address: string
  gameType: string
  startsAt: string
  endsAt: null
  location: string
  participantLimit: number
  pointsForParticipation: number
  status: string
  createdAt: string
  updatedAt: string
  _count: {
    registrations: number
  }
}

export type EventsResponse = {
  data: Event[]
  meta: {
    page: number
    total: number
    limit: number
    pages: number
  }
}

export type EventResponse = Event

export type UpdateEventParams = { id: Event['id'] }

export type UpdateEventPayload = {
  address: Event['address']
  startsAt: Event['startsAt']
  gameType: Event['gameType']
  participantLimit: Event['participantLimit']
  imageUrl: Event['imageUrl']
  imageHash: Event['imageHash']
}

export type CreateEventPayload = {
  address: Event['address']
  startsAt: Event['startsAt']
  gameType: Event['gameType']
  participantLimit: Event['participantLimit']
  imageUrl: Event['imageUrl']
  imageHash: Event['imageHash']
}

export type ReorderParticipantsPayload = {
  participants: {
    userId: string
    position: number
  }[]
}
