import React, { FC, useEffect } from 'react'
import Calender from './Components/Calender'
import Header from './Components/Header'
import { useParams } from 'react-router-dom'
import { Day, MonthData, MonthNumber,URLparams, WeeklyDataKey } from './Types/types'
import { useDataProvider } from './Context/useDataProvider'
import { getDayNumber, getDayNumberFromString, getDaysInMonth, getTreatmentWeekNumber } from './Utils/dateHelper'
import { updateMonthToCalender } from './Reducer/actions'
import { TodayContext } from './Context/TodayProvider'


const App:FC = () => {
  const params:URLparams = useParams()
  const today  = params.day && new Date ( parseInt(params.year), parseInt(params.month)-1, parseInt(params.day)) || new Date()//Mocks the provided data as today
  const month = parseInt(params.month) >=1 ? parseInt(params.month)-1: today.getMonth()
  const year = parseInt(params.year) || today.getFullYear()
  const [state,dispatch] = useDataProvider()

  useEffect(() => {
    const monthWithActions: MonthData= {}
    const dummyMonth =  [...new Array(getDaysInMonth(month as MonthNumber, year))]

    dummyMonth.forEach((_val,index) => { //Iterate through each day of the month
      const date = index+1
      const dateObj = new Date(year,month,date)
      const treatmentWeekNumber = getTreatmentWeekNumber(dateObj)
      const weeklyData =state['data'] && state['data']['week'+treatmentWeekNumber as WeeklyDataKey]

      if(weeklyData && dateObj){ //If the weeknumber is right and thre is action on current week
        weeklyData.forEach( data => {
          if( getDayNumberFromString(data.weekday as Day) !== getDayNumber(dateObj)) { //If the current day is not same as data day skip
            return null
          }

          if(!data.completed && dateObj.getTime() <= today.getTime() && month === today.getMonth() &&  year === today.getFullYear()){ //If data is not completed on the past and month is notcurrent month

            for(let i = today.getDate(); i<=dummyMonth.length; i++){ //Start at todays date and move forward until empty day is found till end of month
              if(monthWithActions[i]) continue
              monthWithActions[i] = data
              break
            }

            return null
          }
          //Assign actions to date
          monthWithActions[date] = data
          return null
        })
      }

    })

    dispatch(updateMonthToCalender(year,month as MonthNumber,monthWithActions))


  },[month,state['data']])

  return (
    <div className='container'>
      <Header title='Weekly Program'></Header>
      <TodayContext.Provider value= {today}>
        <Calender currentMonth={month as MonthNumber} currentYear={year}/>
      </TodayContext.Provider>
    </div>

  )
}

export default App
