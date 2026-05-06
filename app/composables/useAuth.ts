import type {
  // AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  MeResponse,
  // UserRole,
  // RegisterOwnerPayload,
  // RegisterOwnerResponse,
} from '~/types/auth'

export function useAuth() {
  const api = useApi()

  const token = useCookie<string | null>('access_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  const user = useState<MeResponse | null>('auth:user', () => null)
  const isLoadingUser = useState<boolean>('auth:is-loading-user', () => false)

  const isAuthenticated = computed(() => Boolean(token.value))
  const isAdmin = computed(() => Boolean(user.value?.role === 'admin'))

  async function login(payload: LoginPayload) {
    const response = await api.request<LoginResponse, LoginPayload>('/auth/login', {
      method: 'POST',
      body: payload,
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
    isAdmin,
    isLoadingUser,
    isAuthenticated,
    login,
    fetchMe,
    logout,
    register,
  }
}
