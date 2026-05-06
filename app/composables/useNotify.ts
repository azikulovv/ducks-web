type Type = 'success' | 'error' | 'info' | 'loading'

export type NotifyItem = {
  id: number
  message: string
  type: Type
  duration?: number
  key?: string
}

const list = ref<NotifyItem[]>([])
let uid = 0
const MAX = 4

export function useNotify() {
  const remove = (id: number) => {
    list.value = list.value.filter((n) => n.id !== id)
  }

  const push = (item: Omit<NotifyItem, 'id'>) => {
    // dedupe по key
    if (item.key) {
      const existing = list.value.find((n) => n.key === item.key)
      if (existing) {
        existing.message = item.message
        existing.type = item.type
        return existing.id
      }
    }

    const n: NotifyItem = { id: ++uid, ...item }

    // limit queue
    if (list.value.length >= MAX) {
      list.value.shift()
    }

    list.value.push(n)

    if (n.duration && n.type !== 'loading') {
      setTimeout(() => remove(n.id), n.duration)
    }

    return n.id
  }

  const update = (id: number, patch: Partial<NotifyItem>) => {
    const n = list.value.find((n) => n.id === id)
    if (!n) return
    Object.assign(n, patch)

    if (patch.type !== 'loading' && patch.duration) {
      setTimeout(() => remove(id), patch.duration)
    }
  }

  const show = (message: string, type: Type = 'info', duration = 3000) =>
    push({ message, type, duration })

  const promise = async <T>(
    fn: Promise<T>,
    messages: {
      loading?: string
      success?: string
      error?: string
    },
  ) => {
    const id = push({
      message: messages.loading || 'Загрузка...',
      type: 'loading',
      duration: 0,
    })

    try {
      const res = await fn

      update(id, {
        message: messages.success || 'Готово',
        type: 'success',
        duration: 3000,
      })

      return res
    } catch (e) {
      update(id, {
        message: messages.error || 'Ошибка',
        type: 'error',
        duration: 4000,
      })
      throw e
    }
  }

  return {
    list,
    show,
    success: (m: string) => show(m, 'success'),
    error: (m: string) => show(m, 'error'),
    info: (m: string) => show(m, 'info'),
    loading: (m: string) => push({ message: m, type: 'loading', duration: 0 }),
    remove,
    promise,
  }
}
