export function useUploadApi() {
  const api = useApi()

  const isUploading = ref(false)

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    isUploading.value = true

    try {
      const res = await api.request('/upload/image', {
        method: 'POST',
        body: formData,
      })

      return res as { url: string; hash: string }
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    isUploading,
  }
}
