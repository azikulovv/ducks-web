export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.token) {
    return navigateTo('/login')
  }

  if (!auth.user) {
    try {
      await auth.fetchMe()
    } catch {
      return navigateTo('/login')
    }
  }

  if (!auth.isAdmin) {
    return navigateTo('/events')
  }
})
