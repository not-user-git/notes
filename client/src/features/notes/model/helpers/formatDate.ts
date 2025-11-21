export const formatDate = (date: string): string => {
  const newDate = new Date(date)
  const currentDate = new Date()

  if (newDate.getFullYear() === currentDate.getFullYear())
    return newDate.toLocaleDateString('ru-Ru', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  return newDate.toLocaleDateString('ru-Ru', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
