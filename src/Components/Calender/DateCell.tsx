import React, { FC } from 'react'
import { isToday } from '../../Utils/dateHelper'

const DateCell:FC<{date:Date | null , treatmentWeekNumber:number }> = ({date,treatmentWeekNumber,}) => {
  return (
    <td className= {date && isToday(date)?'dateCellToday  dateCell':'dateCell'}> <h2>{date && date.getDate()}</h2> </td>
  )
}

export default DateCell