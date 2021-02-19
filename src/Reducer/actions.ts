import { CalenderAction, Program } from "../Types/types"
import { ADD_TO_CALENDER } from "./reducer"

type DataPayload = {
  data:Program, 
  date:Date
}

export const updateToCalender = (date:Date,data:Program) : CalenderAction => {
     const today =new Date()
     const payload : DataPayload =  {date,data}
     if(!data.completed && date.getTime() < today.getTime() && date.getMonth() === today.getMonth() &&  date.getFullYear() === today.getFullYear()){  
      // If action is not completed for the day and action is on past but on this month 
      //(month/year check is implemented to prevent action shifting to currentMonth if the initalized month is not current month) 
      payload.date = today
    }
    // Proceed only if completed or not viewing current month
    return ({
        type:ADD_TO_CALENDER,
        payload: payload
    })

}