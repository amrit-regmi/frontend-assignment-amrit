import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import DateCell from '../../../Components/Calender/DateCell'
import { Store } from '../../../Types/types'
import  { DataProvider }  from '../../../Context/DataProvider'
import { useDataProvider } from '../../../Context/useDataProvider'
import { act } from 'react-dom/test-utils'
import ReactRouter from 'react-router'

jest.mock('../../../Context/useDataProvider')



const mockDates = [1,13,16]
const mockMonth = 1
const mockYear =2021
const mockDispatch = jest.fn()

beforeEach(() => {
  const days = {}
  const mockState:Store =  {
    calender:{
      [mockYear]: {
        [mockMonth]: days
      }
    },
  }
  mockDates.forEach(date => {
    mockState['calender'][mockYear][mockMonth][date] = {
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





