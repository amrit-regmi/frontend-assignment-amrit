import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Calender from '../../../Components/Calender'
import { MonthNumber } from '../../../Types/types'

describe ('Should render enough rows to contain the total days', () => {
  test('should render 6 calender rows for August 2021',() => {
    const calender = {
      currentMonth: 7 as MonthNumber,
      currentYear: 2021
    }
  
    const component = render(<Calender {...calender}></Calender>)
    const rows =  component.container.querySelectorAll('tbody > tr')
    expect (rows.length).toBe(6)
  })

  test('should render 5 calender rows for March 2021',() => {
    const calender = {
      currentMonth: 2 as MonthNumber,
      currentYear: 2021
    }
  
    const component = render(<Calender {...calender}></Calender>)
    const rows =  component.container.querySelectorAll('tbody > tr')
    expect (rows.length).toBe(5)
  })

  test('should render 4 calender rows for February 2021',() => {
    const calender = {
      currentMonth: 1 as MonthNumber,
      currentYear: 2021
    }
  
    const component = render(<Calender {...calender}></Calender>)
    const rows =  component.container.querySelectorAll('tbody > tr')
    expect (rows.length).toBe(4)
  })
})