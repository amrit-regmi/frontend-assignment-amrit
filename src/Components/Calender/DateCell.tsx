import React, { FC, useEffect } from 'react'
import { getDayNumber, getDayNumberFromString, getTreatmentWeekNumber, isToday } from '../../Utils/dateHelper'
import {Day, MonthNumber, WeeklyDataKey} from '../../Types/types'
import { useDataProvider } from '../../Context/useDataProvider'
import { updateToCalender } from '../../Reducer/actions'

const DateCell:FC<{date:Date | null }> = ({date}) => {
  const [state,dispatch] = useDataProvider()

  useEffect(()=>{
    if(!date){
      return 
    }
    const treatmentWeekNumber = getTreatmentWeekNumber(date)
    const weeklyData = 
      state['data'] &&
      state['data']['week'+treatmentWeekNumber as WeeklyDataKey]

    if(weeklyData && date){
      weeklyData.forEach( data => { 
        if( getDayNumberFromString(data.weekday as Day) !== getDayNumber(date)) { //If the current day is not same as data day skip
          return
        }     
        dispatch(updateToCalender(date,data))
      })
    }
  
  },[date])

  const data = date 
    && state['calender'][date.getFullYear()] 
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber]  
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber][date.getDate()-1]

  const istoday = isToday(date)
  
  return (
    <td className = {`dateCell ${istoday? 'dateCellToday': ''} ${data?'dateCellHasActivity':''}`}> 
    {date && 
      <div>
        <h2>{ date.getDate()}</h2>
        <h3 className = {!istoday? 'pureBlack' : 'white'}>{data && data.title.toLocaleUpperCase()}</h3>
      </div>
    } 
    </td>
  )
}

export default DateCell