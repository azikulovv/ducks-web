import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  MeResponse,
  LoginViaTelegramPayload,
} from '~/types/auth'

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
      // const initData = window.Telegram.WebApp.initData
      const initData =
        'query_id=AAFhCd0RAwAAAGEJ3RFpyGuE&user=%7B%22id%22%3A6742149473%2C%22first_name%22%3A%22Maulen%22%2C%22last_name%22%3A%22Azikulov%22%2C%22username%22%3A%22azikulov%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fo9-yxcdolrF4yvlbpbAaECk4byt3AObbSVriLjzdJ_0yZ5T6RA31HAVxTKZE-mB3.svg%22%7D&auth_date=1778406568&signature=oycQtPvo1iiTlIi1Hes3G438fkj7Na0oS2HSahxaEeixWUyAkUCnGekTZpdQ0M760DGcrODlcr5NUZVp1DA_BA&hash=e55824a2783017e4f43c9e56fca2a26049022ec2c0d085840d84e5a912bb44f8'

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
      const response = await api.request<RegisterResponse, RegisterPayload>('/auth/register', {
        method: 'POST',
        body: payload,
        auth: false,
      })

      token.value = response.token

      await fetchMe()

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
