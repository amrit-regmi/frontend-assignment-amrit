import React, { FC } from 'react'
import { getDayNumber, getTotalWeekSpanForMonth } from '../../Utils/dateHelper'
import WeekRow from './WeekRow'

const Calender:FC<{currentMonth:number,currentYear:number}> = ({currentMonth,currentYear}) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ,'SUN']
  
  const weekStartDate= new Date(currentYear,currentMonth,1) //First day of month
  let treatmentWeekNumber = 0  
   
  //Data per week 
  const weeks = [...Array(getTotalWeekSpanForMonth(currentMonth,currentYear))].map(() => {
    const currentWeekStartDate = new Date(weekStartDate.getFullYear(),weekStartDate.getMonth(),weekStartDate.getDate())
    
    if(currentWeekStartDate.getDay() === 0){
      //If the week is not full week then 0 else increment by 1
      treatmentWeekNumber=+1
    }

    const weekData = {
      startDate: currentWeekStartDate,
      treatmentWeekNumber: treatmentWeekNumber
    }
    weekStartDate.setDate(weekStartDate.getDate() + 7 - getDayNumber(weekStartDate))
    return weekData
  })

  return(
    <table className= 'calenderTable'>
      <thead>
        <tr>
          {days.map((day,i) => <th key={i}>{day}</th>)}
        </tr>
        </thead>
      <tbody>
        {weeks.map((week,index) => <WeekRow key = {index} {...week}></WeekRow>)}
      </tbody>
    </table>
  )
}

export default Calender