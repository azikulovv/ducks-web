import type { AuthUser } from './auth'

export type Feedback = {
  id: string
  message: string
  createdAt: string
  user: AuthUser
}

export type GetFeedbackResponse = {
  data: Feedback[]
  meta: { page: number; total: number; limit: number; pages: number }
}

export type CreateFeedbackPayload = {
  message: string
}

export type CreateFeedbackResponse = {}
