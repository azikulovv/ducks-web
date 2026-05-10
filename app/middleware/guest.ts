export default defineNuxtRouteMiddleware(() => {
  const { token } = useAuthStore()

  if (token) {
    return navigateTo('/events')
  }
})
