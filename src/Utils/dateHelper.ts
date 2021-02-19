import { Day, DayNumber, MonthNumber, PossibleWeekNumber } from "../Types/types"

/**
 * @param month javascript month int ie. january is 0 and so on 
 * @param year year- number ofdays in  isdiffernt on leap year 
 * @returns number of days inamonth
 */
export const getDaysInMonth = (month:MonthNumber ,year: number ):number => {
  const newDate = new Date(year,month+1,0)
  return newDate.getDate()
}

/**
 * @param month javascript month int ie. january is 0 and so on 
 * @param year year- number ofdays in  isdiffernt on leap year 
 * @returns number daynumber 0 being Munday
 */
export const getFirstDayOfMonth = (month:MonthNumber,year:number):DayNumber => {
  const newDate = new Date(year,month,1)
  const day = newDate.getDay() -1 //Shifting daynumber so monday is 0 and so on 
  if( day=== -1) return 6 //If day is sunday  
   return day as DayNumber
}

/**
 * @param date Date Object 
 * @returns number  daynumber 0 being Munday, first day of the week for the date 
 */
export const getDayNumber = (date:Date):DayNumber => {
  const day = date.getDay() -1 //Shifting daynumber so monday is 0 and so on 
  if( day=== -1) return 6 //If day is sunday  
  return day as DayNumber
}

/**
 * @param month javascript month int ie. january is 0 and so on 
 * @param year year- number ofdays in  isdiffernt on leap year 
 * @returns number - number of weeks that the month spans 4 5 or 6
 */
export const getTotalWeekSpanForMonth = (month:MonthNumber,year:number): PossibleWeekNumber => {
  const firstDay = getFirstDayOfMonth(month,year)
  const totalDays = getDaysInMonth(month,year)
  const cellsVisbleinCalender = totalDays+firstDay
  return Math.ceil(cellsVisbleinCalender/7) as PossibleWeekNumber
}

/**
 * 
 * @param date Date Object
 * @returns boolean if the given date same day as today
 */
export const isToday = (date:Date):boolean => {
  const today = new Date()
  return isDateEqual(today,date)
}

/**
 * 
 * @param day String of Day type ex 'MONDAY'
 * @returns number daynumber 0 being Munday
 */
export const getDayNumberFromString = (day:Day):DayNumber => {
  const days = ["MONDAY" , "TUESDAY" , "WEDNESDAY" , "THURSDAY" , "FRIDAY" , "SATURDAY" , "SUNDAY"]
  return days.indexOf(day.toUpperCase()) as DayNumber
}

/**
 * @param date1 Date Object
 *  @param date2 Date Object
 * @returns boolean if the given date(only dates not time) are equal
 */
export const isDateEqual = (date1:Date,date2:Date):boolean => {
  if(!(date1 instanceof Date && date2 instanceof Date)) return false
  if(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()){
    return true
  }
  return false
}

/**
 * @param date Date Object
 *  @param date2 Date Object
 * @returns treatment week number 0 if week does not start on Mon
 */
export const getTreatmentWeekNumber = (date:Date):number => {
  const monthstartDay = getFirstDayOfMonth(date.getMonth() as MonthNumber,date.getFullYear())
  const prependDays = monthstartDay || 7 -1
  const calc =Math.trunc((prependDays +date.getDate())/7)
  return calc

  
}
