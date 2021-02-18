import { Calender, CalenderAction, MonthNumber, Program, Store } from '../Types/types'
import { getDaysInMonth } from '../Utils/dateHelper'
export const ADD_TO_CALENDER = 'ADD_TO_CALENDER'
export const INITIALIZE_MONTH = 'INITIALIZE_MONTH'

const addToCalender = (calender:Calender, payload:{ date: Date, data: Program } ): Calender => {
  const year =  payload.date.getFullYear()
  const month = payload.date.getMonth() as MonthNumber
  const date = payload.date.getDate() 
  const dateIndex = date-1
  
  /**Initailize calender data if it is not initalized */
  if(!calender[year]) calender[year] = {}
  if(!calender[year][month])  calender[year][month] = [...new Array(getDaysInMonth(month,year))]
  
  for(let i= dateIndex; i <= calender[year][month].length; i++ ){ //Iterate forward from current date positon      
    
    if(!calender[year][month][i]){  //If the date incurrent position doesnot have any data insert to this positon and break 
      calender[year][month][i] = payload.data
      break
    }

    if(JSON.stringify(calender[year][month][i]) === JSON.stringify(payload.data) ){ //If the calender data in current positon is same as payload data than noneed to insert duplicate data -break
      break
    }
    
  }
  return calender
}

const reducer = (state:Store , action : CalenderAction ) : Store => {
  switch(action.type){
  case ADD_TO_CALENDER:
    return ({...state, calender: addToCalender({...state.calender}, action.payload)})
  default:
    return state
  }
}
export default reducer