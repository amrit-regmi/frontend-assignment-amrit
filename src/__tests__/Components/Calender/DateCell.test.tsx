import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import DateCell from '../../../Components/Calender/DateCell'
import { MonthNumber, Store, WeeklyData } from '../../../Types/types'
import  { DataProvider }  from '../../../Context/DataProvider'
import { useDataProvider } from '../../../Context/useDataProvider'
import { act } from 'react-dom/test-utils'
import { getDayNumber, getDaysInMonth, getTreatmentWeekNumber } from '../../../Utils/dateHelper'
import data from '../../../Context/data.json'
import ReactRouter from 'react-router'

jest.mock('../../../Context/useDataProvider')




const newTypedData:WeeklyData = {}
const typedData = Object.assign(data,newTypedData) //TypeCast JSON data

const mockDates = [1,13,16]
const mockMonth = 1
const mockYear =2021
const mockDispatch = jest.fn()

beforeEach(() => {
  const days = [...new Array(getDaysInMonth(mockMonth,mockYear))]
  const mockState:Store =  {
    calender:{
      [mockYear]: {
        [mockMonth]: days
      }
    },
  }
  mockDates.forEach(date => {
    mockState['calender'][mockYear][mockMonth][date-1] = {
      'weekday': 'MONDAY',
      'title': `The Meru Health Program TEST ${date}`,
      'completed': true
    }
  })
  const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
  useDataProviderMock.mockReturnValue([mockState, mockDispatch ])
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ })
})

describe ('Test the compnent renders properly based on value from stored calender context ',  () => {
  test('display action title if given date has action',async () => {
    await act( async () => {

      mockDates.forEach( date => {
        const  cellData = { date :  new Date(mockYear,mockMonth,date) }
        const  component = render(<DataProvider><DateCell {...cellData}/></DataProvider>)
        const cell =  component.container.querySelector('div > h3')
        expect (cell).toHaveTextContent(`The Meru Health Program TEST ${cellData.date.getDate()}`.toUpperCase())

      })

    })
  })

})


describe ('Test the date is rendered', () => {
  test('if given date is not null ,should render date ',() => {
    const date = new Date(2021,1,1)
    const treatmentWeekNumber = 4
    const cellData = { date, treatmentWeekNumber
    }
    const component = render(<DataProvider><DateCell {...cellData}/></DataProvider>)
    const cell =  component.container.querySelector('div > h2')
    expect (cell).toHaveTextContent('1')
  })

  test('if given date is not null, should not render date ',() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const date: any = null
    const cellData = { date }
    const component = render(<DataProvider><DateCell {...cellData}/></DataProvider>)
    const cell =  component.container.querySelector('h2')
    expect (cell).toBe(null)
  })


  test ('Today is highlighted', () => {
    const date =new Date()
    const cellData = { date }
    const component = render(<DataProvider><DateCell {...cellData}/></DataProvider>)
    const cell =  component.container.querySelector('td')

    expect(cell).toHaveClass('dateCellToday')
  })
})


describe('Test treatment program only starts on first full week of Month' ,() => {
  test('disptachs update on calender if day falls on full week and action exists', () => {
    const mockState:Store =  {
      calender:{},
      data: typedData
    }
    const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
    useDataProviderMock.mockReturnValue([mockState, mockDispatch ])

    const months = [0,1,7]//run test for Jan Feb August 2021
    months.forEach( month => {
      const daysInmonth = getDaysInMonth(month as MonthNumber,2021)
      for(let i = 1; i <=daysInmonth;i++  ){
        const date = new Date(2021,month,i)
        jest.clearAllMocks()
        render(<DataProvider><DateCell date= {date}/></DataProvider>)

        if([0,2,4].includes(getDayNumber(date))){ //If date is on Mon Wed or Fri - Based onMock Data
          if([1,2,3].includes(getTreatmentWeekNumber(date))){
            expect(mockDispatch).toBeCalledTimes(1)
          }
          else{
            expect(mockDispatch).toBeCalledTimes(0)
          }
        }
      }
    })
  })
})


