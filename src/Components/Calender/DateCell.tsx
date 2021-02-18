import React, { FC, useEffect } from 'react'
import { useDataProvider } from '../../Context.tsx/DataProvider'
import { getDayNumber, getDayNumberFromString, isToday } from '../../Utils/dateHelper'
import {Day, MonthNumber, WeeklyDataKey} from '../../Types/types'
import { ADD_TO_CALENDER } from '../../Context.tsx/reducer'


const DateCell:FC<{date:Date | null , treatmentWeekNumber:number }> = ({date,treatmentWeekNumber,}) => {
  const [state,dispatch] =useDataProvider()
  useEffect(()=>{
    const weeklyData = 
      state['data'] &&
      state['data']['week'+treatmentWeekNumber as WeeklyDataKey]
    
    if(weeklyData && date){
      const today = new Date()

      weeklyData.forEach( data => { 
        
        if( getDayNumberFromString(data.weekday as Day) !== getDayNumber(date)) { //If the current day is not same as data day skip
          return
        }
        
        //Proceed after the days  match
        if(!data.completed && date.getTime() < today.getTime() && date.getMonth() === today.getMonth() &&  date.getFullYear() === today.getFullYear()){  
          // If action is not completed for the day and action is on past but on this month 
          //(month/year check is implemented to prevent action shifting to currentMonth if the initalized month is not current month) 
          dispatch({
            type:ADD_TO_CALENDER,
            payload: {date:today,data}
          })
          return 
        }
        
        // Proceed only if completed or not viewing current month
        dispatch({
            type:ADD_TO_CALENDER,
            payload: {date,data}
        })
      })
    }
  
  },[date,treatmentWeekNumber])

  const data = date 
    && state['calender'][date.getFullYear()] 
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber]  
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber][date.getDate()-1]

  const istoday = isToday(date)
  
  return (
    <td className = {`dateCell ${istoday? 'dateCellToday': ''} ${data?'dateCellHasActivity':''}`}> 
      <div>
        <h2>{date && date.getDate()}</h2>
        <h3 className = {!istoday? 'pureBlack' : 'white'}>{data && data.title.toLocaleUpperCase()}</h3>
      </div> 
    </td>
  )
}

export default DateCell