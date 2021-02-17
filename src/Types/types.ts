export type Day = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
export type Program = {
  weekday: Day,
  title: string,
  completed: boolean
}