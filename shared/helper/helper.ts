export const formatDate = (value: any) => {
  if (!value) return "-"

  let date: Date

  if (value?.toDate) {
    date = value.toDate()
  } else {
    date = new Date(value)
  }

  if (isNaN(date.getTime())) return "-"

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}