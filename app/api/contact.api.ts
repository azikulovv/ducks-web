import type { SendContactPayload } from '~/types/contact'

export function useContactApi() {
  const api = useApi()

  const sendContact = (payload: SendContactPayload) => {
    return api.request(`/contact`, {
      method: 'POST',
      body: payload,
    })
  }

  return {
    sendContact,
  }
}
