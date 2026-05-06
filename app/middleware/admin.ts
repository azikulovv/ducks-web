export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  if (!auth.token.value) {
    return navigateTo('/login')
  }

  if (!auth.user.value) {
    try {
      await auth.fetchMe()
    } catch {
      return navigateTo('/login')
    }
  }

  if (!auth.isAdmin.value) {
    return navigateTo('/events')
  }
})
