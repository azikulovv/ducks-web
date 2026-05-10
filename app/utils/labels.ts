export const getGameLabel = (type: string) => {
  return (
    {
      poker: 'Покер',
      billiards: 'Бильярд',
      darts: 'Дартс',
      quiz: 'Квиз',
      mafia: 'Мафия',
    }[type] ?? type
  )
}

export const getStatusLabel = (type: string) => {
  return (
    {
      draft: 'Черновик',
      published: 'Доступен',
      cancalled: 'Отменен',
      completed: 'Завершен',
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
    class: 'bg-(--logo-bg)/10 text-(--logo-bg) border-(--logo-bg)/20',
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
