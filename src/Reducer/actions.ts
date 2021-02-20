import { CalenderAction, MonthData, MonthNumber } from '../Types/types'
import { UPDATE_MONTHLY_ACTION_TO_CALENDER } from './reducer'

export const updateMonthToCalender = (year: number,month:MonthNumber, data: MonthData ) : CalenderAction => {
  return ({
    type:UPDATE_MONTHLY_ACTION_TO_CALENDER,
    payload: { year,month, data }
  })

}