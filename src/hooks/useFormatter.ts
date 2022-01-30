export const useFormatter = () => {
  const splitContent = (value: string, length: number) => {
    return value.length > length ? `${value.substring(0, length)}...` : value
  }

  const formatDate = (value: string) => {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]

    return `${year}/${month}/${day}  ${week}`
  }
  return {
    splitContent,
    formatDate,
  }
}
