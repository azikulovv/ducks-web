export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (auth.token) {
    return navigateTo('/')
  }
})
