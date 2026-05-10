export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.token) {
    return navigateTo('/login')
  }

  if (!auth.user) {
    const user = await auth.fetchMe()

    if (!user) {
      return navigateTo('/login')
    }
  }
})
