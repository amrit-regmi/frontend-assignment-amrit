import React, { FC } from 'react' 
import { getDayNumber} from '../../Utils/dateHelper'
import DateCell from './DateCell'

const WeekRow:FC<{startDate:Date}> = ({startDate}) => {
    
  const startDay = getDayNumber(startDate)
 
  //Store each day for a week 
  const dates = [...Array(7)].map((date,index)=> {
      const newDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+index-startDay)
      
      // If day does not belong to current month then return null
      if(newDate.getMonth() !== startDate.getMonth()) {
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

              />
          )

        })}
    </tr>)
  
}

export default WeekRow