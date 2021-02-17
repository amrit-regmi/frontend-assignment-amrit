/**
 * @param month javascript month int ie. january is 0 and so on 
 * @param year year- number ofdays in  isdiffernt on leap year 
 * @returns number of days inamonth
 */
export const getDaysInMonth = (month:number ,year: number ):number => {
  const newDate = new Date(year,month+1,0)
  return newDate.getDate()
}

/**
 * @param month javascript month int ie. january is 0 and so on 
 * @param year year- number ofdays in  isdiffernt on leap year 
 * @returns number daynumber 0 being Munday
 */
export const getFirstDayOfMonth = (month:number,year:number):number => {
  const newDate = new Date(year,month,1)
  const day = newDate.getDay() -1 //Shifting daynumber so monday is 0 and so on 
  if( day=== -1) return 6 //If day is sunday  
   return day
}

/**
 * @param date Date Object 
 * @returns number  daynumber 0 being Munday, first day of the week for the date 
 */
export const getDayNumber = (date:Date):number => {
  const day = date.getDay() -1 //Shifting daynumber so monday is 0 and so on 
  if( day=== -1) return 6 //If day is sunday  
   return day
}

/**
 * @param month javascript month int ie. january is 0 and so on 
 * @param year year- number ofdays in  isdiffernt on leap year 
 * @returns number - number of weeks that the month spans
 */
export const getTotalWeekSpanForMonth = (month:number,year:number):number => {
  const firstDay = getFirstDayOfMonth(month,year)
  const totalDays = getDaysInMonth(month,year)
  const cellsVisbleinCalender = totalDays+firstDay
  return Math.ceil(cellsVisbleinCalender/7)
}

/**
 * 
 * @param date Date Object
 * @returns boolean if the given date same day as today
 */
export const isToday = (date:Date):boolean => {
  const today = new Date()
  console.log(date,today)
  if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()){
    return true
  }
  return false

}