export const renderPicture = (url: string) => {
  const config = useRuntimeConfig()

  return config.public.apiBaseUrl.replace('/api', '') + url
}
