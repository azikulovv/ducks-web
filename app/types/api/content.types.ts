export const ContentKeys = {
  FAQ: 'faq',
  RULES: 'rules',
  ABOUT: 'about',
  POKER_LEVELS: 'poker-levels',
} as const

export type ContentKeys = (typeof ContentKeys)[keyof typeof ContentKeys]

export type GetContentsParams = {
  key: ContentKeys
}

export type GetContentsResponse = {}

export type UpdateContentParams = GetContentsParams

export type UpdateContentPayload = {}

export type UpdateContentResponse = {}
