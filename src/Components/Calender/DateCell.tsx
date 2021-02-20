import React, { FC, useEffect } from 'react'
import { getDayNumber, getDayNumberFromString, getTreatmentWeekNumber, isToday } from '../../Utils/dateHelper'
import { Day, MonthNumber, URLparams, WeeklyDataKey } from '../../Types/types'
import { useDataProvider } from '../../Context/useDataProvider'
import { updateToCalender } from '../../Reducer/actions'
import { useParams } from 'react-router-dom'

const DateCell:FC<{date:Date | null }> = ({ date }) => {
  const [state,dispatch] = useDataProvider()
  const params:URLparams = useParams()
  const mockToday = params.day && new Date ( parseInt(params.year), parseInt(params.month)-1, parseInt(params.day)) //Mocks the provided data as today

  useEffect(() => {
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
        dispatch(updateToCalender(date,data ,mockToday))
      })
    }

  },[date])

  const data = date
    && state['calender'][date.getFullYear()]
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber]
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber][date.getDate()-1]

  const istoday = isToday(date,mockToday)

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