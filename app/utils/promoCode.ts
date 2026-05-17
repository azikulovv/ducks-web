import { usePromoLinksApi } from '~/api/promoLinksApi'

const PROMO_CODE_KEY = 'promoCode'
const TRACKED_PROMO_CODE_KEY = 'trackedPromoCode'
const PROMO_CODE_PATTERN = /^[a-zA-Z0-9_-]{2,64}$/

const normalizePromoCode = (value: unknown) => {
  let code = ''

  if (Array.isArray(value)) {
    code = typeof value[0] === 'string' ? value[0].trim() : ''
  } else {
    code = typeof value === 'string' ? value.trim() : ''
  }

  return PROMO_CODE_PATTERN.test(code) ? code : ''
}

export const getPromoCodeFromTelegram = () => {
  if (!process.client) return ''

  return normalizePromoCode(window.Telegram?.WebApp?.initDataUnsafe?.start_param)
}

export const getPromoCodeFromUrl = () => {
  if (!process.client) return ''

  const route = useRoute()

  return normalizePromoCode(route.query.promo || route.query.startapp || route.query.start_param)
}

export const shouldTrackPromoCodeClick = () => {
  if (!process.client) return false

  const route = useRoute()

  return route.query.promoSource !== 'telegram_bot'
}

export const savePromoCode = (code: string) => {
  if (!process.client || !code) return

  localStorage.setItem(PROMO_CODE_KEY, code)
}

export const getSavedPromoCode = () => {
  if (!process.client) return ''

  return localStorage.getItem(PROMO_CODE_KEY) || sessionStorage.getItem(PROMO_CODE_KEY) || ''
}

export const clearSavedPromoCode = () => {
  if (!process.client) return

  localStorage.removeItem(PROMO_CODE_KEY)
  sessionStorage.removeItem(PROMO_CODE_KEY)
}

export const trackPromoCodeOnce = async (code: string) => {
  if (!process.client || !code) return

  const trackedPromoCode = sessionStorage.getItem(TRACKED_PROMO_CODE_KEY)

  if (trackedPromoCode === code) return

  const { trackPromoClick } = usePromoLinksApi()

  await trackPromoClick(code)
  sessionStorage.setItem(TRACKED_PROMO_CODE_KEY, code)
}

export const initPromoCodeTracking = async () => {
  const promoCode = getPromoCodeFromTelegram() || getPromoCodeFromUrl()

  if (!promoCode) return

  savePromoCode(promoCode)

  try {
    if (shouldTrackPromoCodeClick()) {
      await trackPromoCodeOnce(promoCode)
    }
  } catch (error) {
    console.error('Promo click tracking failed', error)
  }
}
