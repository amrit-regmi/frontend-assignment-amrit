import React, { FC } from 'react' 
import { getDayNumber} from '../../Utils/dateHelper'
import DateCell from './DateCell'

const WeekRow:FC<{startDate:Date, treatmentWeekNumber:number}> = ({startDate,treatmentWeekNumber}) => {
    
  const startDay = getDayNumber(startDate)
  const dates = [...Array(7)].map((date,index)=> {
      const newDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+index-startDay)
      
      if(index < startDay || newDate.getMonth() !== startDate.getMonth()) {
        return null
      }

      return  newDate
    })

    return (
      <tr>
        {dates.map((date,index)=> {
          return(
            <DateCell 
              key={index} 
              date={date} 
              treatmentWeekNumber = {treatmentWeekNumber}
              />
          )

        })}
    </tr>)
  
}

export default WeekRow