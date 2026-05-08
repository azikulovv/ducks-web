export type AuthUser = {
  id: string
  email: string
  avatarUrl: null
  avatarHash: null
  name: string
  role: 'user' | 'admin'
  updatedAt: string
  createdAt: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: AuthUser
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type RegisterResponse = {
  token: string
  user: AuthUser
}

export type MeResponse = AuthUser & {
  ratings: {
    gameType: string
    points: number
  }[]
}
