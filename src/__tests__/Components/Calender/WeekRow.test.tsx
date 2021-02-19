import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import WeekRow from '../../../Components/Calender/WeekRow'
import { getDayNumber, getFirstDayOfMonth } from '../../../Utils/dateHelper'

describe ('Rows test', () => {
  test('should render 7 cells',() => {
    const row0 = {
      startDate: new Date(2021,1,1),
      treatmentWeekNumber: 0
    }
    const component = render(<WeekRow{...row0}></WeekRow>)
    const cells =  component.container.querySelectorAll('td')
    expect (cells.length).toBe(7)
  })

  test('if month startDay is not monday then do not render texts on leading cells up to start date',() => {
    const monthStartDate = new Date(2021,3,1)
    const row0 = {
      startDate: monthStartDate,
      treatmentWeekNumber: 0
    }
    const component = render(<WeekRow{...row0}></WeekRow>)
    const cells =  component.container.querySelectorAll('td')
    const firstDay = getFirstDayOfMonth(3,2021)

    for( let i = 0 ; i < 7 ; i++){
      if(i < firstDay){
        expect (cells[i]).toHaveTextContent('')
      }
      if(i >= firstDay){
        expect (cells[i]).toHaveTextContent((i-firstDay+1).toString())
      }
    }
  })

  test('if month endDay is not sunday then do not render texts after end date',() => {
    const monthEndDate = new Date(2021,2,31)
    const weekStartDate = new Date(2021,2,29)
    const row0 = {
      startDate: weekStartDate ,
      treatmentWeekNumber: 0
    }
    const component = render(<WeekRow{...row0}></WeekRow>)
    const cells =  component.container.querySelectorAll('td')
    const lastDay = getDayNumber(monthEndDate)

    for( let i = 0 ; i < 7 ; i++){
      if(i <= lastDay){
        expect (cells[i]).toHaveTextContent((weekStartDate.getDate()+i).toString())
      }
      if(i > lastDay){
        expect (cells[i]).toHaveTextContent('')
      }
    }

  })
})