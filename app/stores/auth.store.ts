import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  MeResponse,
  LoginViaTelegramPayload,
  UpdateProfilePayload,
} from '~/types/auth'
import { clearSavedPromoCode, getSavedPromoCode } from '~/utils/promoCode'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const api = useApi()

    const token = ref<string | null>(null)
    const user = ref<MeResponse | null>(null)
    const isLoadingUser = ref(false)

    const isAuthenticated = computed(() => Boolean(token.value))
    const isAdmin = computed(() => {
      return user.value?.role === 'admin'
    })

    async function updateProfile(payload: UpdateProfilePayload) {
      const response = await api.request<UpdateProfilePayload, UpdateProfilePayload>('/users/me', {
        method: 'PATCH',
        body: payload,
      })

      return response
    }

    async function login(payload: LoginPayload) {
      const response = await api.request<LoginResponse, LoginPayload>('/auth/login', {
        method: 'POST',
        body: payload,
        auth: false,
      })

      token.value = response.token

      return response
    }

    async function loginViaTelegram() {
      const initData = window.Telegram.WebApp.initData

      if (!initData) {
        throw new Error('Telegram initData missing')
      }

      const response = await api.request<LoginResponse, LoginViaTelegramPayload>('/auth/telegram', {
        method: 'POST',
        body: {
          initData,
        },
        auth: false,
      })

      token.value = response.token

      return response
    }

    async function fetchMe() {
      if (!token.value) {
        user.value = null

        return null
      }

      isLoadingUser.value = true

      try {
        const response = await api.request<MeResponse>('/users/me', {
          method: 'GET',
        })

        user.value = response

        return response
      } catch (error) {
        token.value = null
        user.value = null

        return null
      } finally {
        isLoadingUser.value = false
      }
    }

    async function register(payload: RegisterPayload) {
      const initData = window.Telegram?.WebApp?.initData
      const promoCode = getSavedPromoCode()

      const response = await api.request<RegisterResponse, RegisterPayload>('/auth/register', {
        method: 'POST',
        body: { ...payload, initData, ...(promoCode ? { promoCode } : {}) },
        auth: false,
      })

      token.value = response.token

      await fetchMe()
      clearSavedPromoCode()

      return response
    }

    function logout() {
      token.value = null
      user.value = null

      navigateTo('/login')
    }

    return {
      token,
      user,
      isLoadingUser,
      isAuthenticated,
      isAdmin,
      login,
      updateProfile,
      loginViaTelegram,
      fetchMe,
      register,
      logout,
    }
  },

  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
)
