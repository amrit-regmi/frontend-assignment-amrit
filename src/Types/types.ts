
export type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export type Program =  {
  weekday: Day
  title: string
  completed: boolean
}
export type PossibleWeekNumber =  4 | 5 | 6
export type MonthNumber  = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type WeeklyDataKey = `week${ 0 | 1 | 2 | 3 | 4}`

export type WeeklyData = {
  [key in  WeeklyDataKey]?: Array<Program>
}

export type MonthData = {[ key in number]?: Program}
/**Storing the calender with full dates because calender can bereused for other purposes */
export type Calender = {
  [year in number]?: {
    [month in MonthNumber]? : MonthData
  }
}

export type CalenderAction =
   {
      type: 'UPDATE_MONTHLY_ACTION_TO_CALENDER',
      payload: {
        year: number,
        month: MonthNumber,
        data: MonthData
      }
    }

export type Store = {
  calender:Calender,
  data?:WeeklyData
}

export type URLparams = {
  mock?:string
  year?:string
  month?:string
  day?:string
}