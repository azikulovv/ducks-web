export type PromoLink = {
  id: string
  name: string
  code: string
  url: string
  clicksCount: number
  registrationsCount: number
  conversionRate: number
  isActive: boolean
  createdAt: string
}

export type CreatePromoLinkPayload = {
  name: string
  code?: string
}

export type UpdatePromoLinkPayload = {
  name?: string
  isActive?: boolean
}

export function usePromoLinksApi() {
  const api = useApi()

  const getPromoLinks = () => {
    return api.request<PromoLink[]>('/admin/promo-links', {
      method: 'GET',
    })
  }

  const createPromoLink = (payload: CreatePromoLinkPayload) => {
    return api.request<PromoLink, CreatePromoLinkPayload>('/admin/promo-links', {
      method: 'POST',
      body: payload,
    })
  }

  const updatePromoLink = (id: string, payload: UpdatePromoLinkPayload) => {
    return api.request<PromoLink, UpdatePromoLinkPayload>(`/admin/promo-links/${id}`, {
      method: 'PATCH',
      body: payload,
    })
  }

  const trackPromoClick = (code: string) => {
    return api.request<void, { code: string }>('/promo-links/track-click', {
      method: 'POST',
      body: { code },
      auth: false,
    })
  }

  return {
    getPromoLinks,
    createPromoLink,
    updatePromoLink,
    trackPromoClick,
  }
}
