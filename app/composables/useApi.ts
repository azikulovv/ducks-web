type QueryValue = string | number | boolean | null | undefined

type ApiOptions<TBody = unknown> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: TBody
  query?: Record<string, QueryValue>
  auth?: boolean
}

function buildUrl(baseUrl: string, path: string, query?: Record<string, QueryValue>) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${baseUrl}${normalizedPath}`)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  async function request<TResponse, TBody = unknown>(
    path: string,
    options: ApiOptions<TBody> = {},
  ) {
    const url = buildUrl(config.public.apiBaseUrl, path, options.query)

    return await $fetch<TResponse>(url, {
      method: options.method || 'GET',
      body: options.body,
      timeout: 10000,
      headers: {
        ...(options.auth !== false && auth.token
          ? {
              Authorization: `Bearer ${auth.token}`,
            }
          : {}),
      },
    })
  }

  return {
    request,
  }
}
