/* eslint-disable no-case-declarations */
import {  CalenderAction, Store } from '../Types/types'
export const UPDATE_MONTHLY_ACTION_TO_CALENDER = 'UPDATE_MONTHLY_ACTION_TO_CALENDER'
const reducer = (state:Store , action : CalenderAction ) : Store => {
  switch(action.type){
  case UPDATE_MONTHLY_ACTION_TO_CALENDER:
    const calender = { ...state['calender'] }
    const payload = action.payload

    let updatedCalender

    if(!calender[payload.year])  updatedCalender = { ...calender, [ payload.year]: { [payload.month]: payload.data } }
    if(calender[payload.year])   updatedCalender = { ...calender,  [ payload.year]: { ...calender[ payload.year], [payload.month]:  payload.data } }

    return ({ ...state, calender: updatedCalender })
  default:
    return state
  }
}
export default reducer


