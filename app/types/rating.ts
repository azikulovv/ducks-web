export type Rating = {
  id: string
  userId: string
  gameType: string
  points: number
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
    name: string
  }
}

export type RatingResponse = {
  data: Rating[]
  meta: {
    page: number
    total: number
    limit: number
    pages: number
  }
}
