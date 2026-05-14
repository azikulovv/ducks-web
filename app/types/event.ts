import type { PaginatedResponse } from './api'
import type { AuthUser } from './auth'

export type EventStatus = keyof typeof statusMap // delete

export const EventGameType = {
  QUIZ: 'quiz',
  POOL: 'pool',
  MAFIA: 'mafia',
  POKER: 'poker',
  DARTS: 'darts',
} as const

export type EventGameType = (typeof EventGameType)[keyof typeof EventGameType]

export const EventGameStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

export type EventGameStatus = (typeof EventGameStatus)[keyof typeof EventGameStatus]

export type Event = {
  id: string
  imageUrl: string
  imageHash: string
  title: string
  city: string
  address: string
  gameType: EventGameType
  gameRules: string
  features: string
  startsAt: string
  endsAt: string
  location: string
  participantLimit: number
  pointsForParticipation: number
  status: EventGameStatus
  createdAt: string
  updatedAt: string
  _count: {
    registrations: number
  }
}

export type EventsResponse = PaginatedResponse<Event>
export type EventResponse = Event

export type UpdateEventParams = { id: Event['id'] }

export type UpdateEventPayload = {
  title: Event['title']
  city: Event['city']
  gameRules: Event['gameRules']
  features: Event['features']
  address: Event['address']
  startsAt: Event['startsAt']
  gameType: Event['gameType']
  participantLimit: Event['participantLimit']
  imageUrl: Event['imageUrl']
  imageHash: Event['imageHash']
}

export type CreateEventPayload = {
  title: Event['title']
  city: Event['city']
  gameRules: Event['gameRules']
  features: Event['features']
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

export type FinalizeEventResponse = {
  success: boolean
}

export type GetEventParticipantsResponse = {
  event: Event
  participants: Participant[]
}

export type Participant = {
  id: string
  userId: string
  eventId: string
  status: EventStatus
  createdAt: string
  cancelledAt: string
  position: number | null
  user: AuthUser
}
