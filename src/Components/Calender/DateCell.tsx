import React ,{ FC, useContext } from 'react'
import { isDateEqual } from '../../Utils/dateHelper'
import { MonthNumber } from '../../Types/types'
import { useDataProvider } from '../../Context/useDataProvider'
import { TodayContext } from '../../Context/TodayProvider'

const DateCell:FC<{date:Date | null }> = ({ date }) => {
  const [state,] = useDataProvider()
  const today = useContext(TodayContext)
  const data = date
    && state['calender'][date.getFullYear()]
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber]
    && state['calender'][date.getFullYear()][date.getMonth() as MonthNumber][date.getDate()]

  const istoday = isDateEqual(date,today)

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