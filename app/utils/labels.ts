import { EventGameStatus } from '~/types/event'

export const getGameLabel = (type: string) => {
  return (
    {
      poker: 'Покер',
      pool: 'Бильярд',
      darts: 'Дартс',
      quiz: 'Квиз',
      mafia: 'Мафия',
    }[type] ?? type
  )
}

export const getStatusLabel = (type: string) => {
  return (
    {
      [EventGameStatus.DRAFT]: 'Черновик',
      [EventGameStatus.PUBLISHED]: 'Доступен',
      [EventGameStatus.CANCELLED]: 'Отменен',
      [EventGameStatus.COMPLETED]: 'Завершен',
    }[type] ?? type
  )
}

export const statusMap = {
  draft: {
    label: 'Черновик',
    class: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  },
  published: {
    label: 'Доступен',
    class: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  cancelled: {
    label: 'Отменен',
    class: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  completed: {
    label: 'Завершен',
    class: 'bg-white/5 text-gray-400 border-white/10',
  },
}
