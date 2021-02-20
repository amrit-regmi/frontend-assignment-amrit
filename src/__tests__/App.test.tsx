import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import MockDate from 'mockdate'
import App from '../App'
import { MemoryRouter, Route } from 'react-router-dom'
import { MonthNumber, Store, WeeklyData, WeeklyDataKey } from '../Types/types'
import { useDataProvider } from '../Context/useDataProvider'
import { DataProvider } from '../Context/DataProvider'
import { getDayNumber, getDayNumberFromString, getDaysInMonth, getTreatmentWeekNumber } from '../Utils/dateHelper'
import data from '../Context/data.json'

jest.mock('../Context/useDataProvider')


afterEach(() => {
  cleanup
  MockDate.reset()
})
const newTypedData:WeeklyData = {}
const typedData = Object.assign(data,newTypedData)
const mockDispatch = jest.fn()

beforeEach(() => {

  const mockState:Store =  {
    calender:{},
    data: typedData
  }
  const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
  useDataProviderMock.mockReturnValue([mockState, mockDispatch ])
})

describe ('Testing app',  () => {
  test('if no prams render default current month ',async () => {
    MockDate.set('2021-2-17') //Set current date to feb 17

    const  component1 =  render(

      <DataProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </DataProvider>
    )
    const cells1 =  component1.container.querySelectorAll('td > div')
    expect (cells1).toHaveLength(28)

    MockDate.set('2020-2-17') //Set current date to feb 17 is leap yearso shouldrwnder 29 days

    const  component2 =  render(
      <DataProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </DataProvider>

    )
    const cells2 =  component2.container.querySelectorAll('td > div')
    expect (cells2).toHaveLength(29)
  })


  test('if mock params provided then render default month from params ',async () => {
    MockDate.set('2021-2-17') //Set current date to feb 17
    const  component1 =  render(
      <DataProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter></DataProvider>
    )
    const cells1 =  component1.container.querySelectorAll('td > div')
    expect (cells1).toHaveLength(28)

    const  component2 =  render(
      <DataProvider>
        <MemoryRouter initialEntries= {['/mock/2020/2']}>
          <Route exact path={['/','/mock/:year/:month', '/mock/:year/:month/:day', '/*']} component={App} />
        </MemoryRouter>
      </DataProvider>

    )
    const cells2 =  component2.container.querySelectorAll('td > div')
    expect (cells2).toHaveLength(29)
  })

  test('if mock params provided as full date then render currentdate as provided date  ',async () => {
    MockDate.set('2021-2-17') //Set current date to feb 17
    const  component1 =  render(
      <DataProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </DataProvider>

    )
    const cells1 =  component1.container.querySelectorAll('td > div')
    expect (cells1).toHaveLength(28)

    const  component2 =  render(
      <DataProvider>
        <MemoryRouter initialEntries= {['/mock/2020/8/7']}>
          <Route exact path={['/','/mock/:year/:month', '/mock/:year/:month/:day', '/*']} component={App} />
        </MemoryRouter>
      </DataProvider>
    )
    const cells2 =  component2.container.querySelectorAll('.dateCellToday')
    expect (cells2).toHaveLength(1)
    expect(cells2[0]).toHaveTextContent('7')
  })

})

describe ('Test actions are correctly updated to state', () => {
  test('test dispatch is called exactly onetime for a month',() => {
    render(
      <DataProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </DataProvider>

    )
    expect(mockDispatch).toBeCalledTimes(1)
  })

  test('Test treatment program only starts on first full week of Month ', () => {
    const months = [0,1,7]//run test for Jan Feb August 2021
    months.forEach( month => {
      jest.clearAllMocks()
      MockDate.reset()
      MockDate.set(`2021-${month+1}-15`)
      render(<DataProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </DataProvider>)

      const dispatchedData = mockDispatch.mock.calls[0][0].payload
      for(let i = 1; i <=10;i++  ){
        const date = new Date(2021,month,i)
        if(getTreatmentWeekNumber(date) === 0){ //If thedate is on first incomplete week
          expect(dispatchedData.data[i]).toBeUndefined
        }
      }
    })
  })

  test('If a user has not completed an activity in the past, the activity will be moved to the current day',() => {
    const months = [0,1,7]//run test for Jan Feb August 2021
    const mockState:Store =  {
      calender:{},
      data: {
        week1: [{
          weekday: 'MONDAY',
          title: 'Test 1',
          completed: false
        }, {
          weekday: 'WEDNESDAY',
          title: 'Test 2',
          completed: true
        },],
        week2: [{
          weekday: 'MONDAY',
          title: 'Test 1',
          completed: true
        }, {
          weekday: 'WEDNESDAY',
          title: 'Test 2',
          completed: true
        },],

      }

    }
    const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
    useDataProviderMock.mockReturnValue([mockState, mockDispatch ])

    months.forEach( month => {
      jest.clearAllMocks()
      MockDate.reset()
      MockDate.set(`2021-${month+1}-17`) // set today
      render(
        <DataProvider>
          <MemoryRouter>
            <App/>
          </MemoryRouter>
        </DataProvider>)

      const dispatchedData = mockDispatch.mock.calls[0][0].payload
      expect(dispatchedData.data['17']).toEqual(mockState.data.week1[0])

      const daysInMonth = getDaysInMonth(month as MonthNumber,2021)
      for (let i = 1 ; i<= daysInMonth; i++ ){
        const onDate = new Date(2021,month,i)
        const weekNo = getTreatmentWeekNumber(onDate)
        const dayNum  = getDayNumber(onDate)
        if( weekNo &&  [0,2,4].includes(dayNum)){
          const weekMatch = mockState.data[`week${weekNo}` as WeeklyDataKey]
          const dayMatch  = weekMatch && weekMatch.filter( daydata =>  getDayNumberFromString(daydata.weekday) === dayNum)
          if ( dayMatch && dayMatch[0] && !dayMatch[0].completed ){
            expect(dispatchedData.data[i]).toBeUndefined
          }
        }
      }
    })

  })

  test('Multiple incomplete activities in the past, the first incomplete activity will be displayed today, the second tomorrow, and so forth',() => {
    const months = [0,1,7]//run test for Jan Feb August 2021
    const mockState:Store =  {
      calender:{},
      data: {
        week1: [{
          weekday: 'MONDAY',
          title: 'Test 1',
          completed: false
        }, {
          weekday: 'WEDNESDAY',
          title: 'Test 2',
          completed: false
        },],
        week2: [{
          weekday: 'MONDAY',
          title: 'Test 1',
          completed: false
        }, {
          weekday: 'WEDNESDAY',
          title: 'Test 2',
          completed: true
        },],

      }

    }
    const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
    useDataProviderMock.mockReturnValue([mockState, mockDispatch ])

    months.forEach( month => {
      jest.clearAllMocks()
      MockDate.reset()
      MockDate.set(`2021-${month+1}-17`) // set today
      render(
        <DataProvider>
          <MemoryRouter>
            <App/>
          </MemoryRouter>
        </DataProvider>)

      const dispatchedData = mockDispatch.mock.calls[0][0].payload
      expect(dispatchedData.data['17']).toEqual(mockState.data.week1[0])
      expect(dispatchedData.data['18']).toEqual(mockState.data.week1[1])
      expect(dispatchedData.data['19']).toEqual(mockState.data.week2[0])
    })

  })

  test('Completed activity on the past will be added to past date',() => {
    const months = [0,1,7]//run test for Jan Feb August 2021
    const mockState:Store =  {
      calender:{},
      data: {
        week1: [{
          weekday: 'MONDAY',
          title: 'Test 1',
          completed: true
        }, {
          weekday: 'WEDNESDAY',
          title: 'Test 2',
          completed: true
        },],
        week2: [{
          weekday: 'WEDNESDAY',
          title: 'Test 1',
          completed: true
        }, {
          weekday: 'FRIDAY',
          title: 'Test 2',
          completed: true
        },],

      }

    }
    const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
    useDataProviderMock.mockReturnValue([mockState, mockDispatch ])

    months.forEach( month => {
      jest.clearAllMocks()
      MockDate.reset()
      MockDate.set(`2021-${month+1}-17`) // set today
      render(
        <DataProvider>
          <MemoryRouter>
            <App/>
          </MemoryRouter>
        </DataProvider>)

      const dispatchedData = mockDispatch.mock.calls[0][0].payload
      const daysInMonth = getDaysInMonth(month as  MonthNumber,2021)
      for (let i = 1 ; i<= daysInMonth; i++ ){
        const onDate = new Date(2021,month,i)
        const weekNo = getTreatmentWeekNumber(onDate)
        const dayNum  = getDayNumber(onDate)
        if( weekNo &&  [0,2,4].includes(dayNum)){
          const weekMatch = mockState.data[`week${weekNo}` as WeeklyDataKey]
          const dayMatch  = weekMatch && weekMatch.filter( daydata =>  getDayNumberFromString(daydata.weekday) === dayNum)
          if ( dayMatch &&dayMatch[0] && dayMatch[0].completed ){
            expect(dispatchedData.data[i]).toEqual(dayMatch[0])
          }
        }
      }
    })

  })

  test('Activites are added to corresponding dates regardless of completed status if not rendering in current month/simulation',() => {
    const mockState:Store =  {
      calender:{},
      data: {
        week1: [{
          weekday: 'MONDAY',
          title: 'Test 1',
          completed: false
        }, {
          weekday: 'WEDNESDAY',
          title: 'Test 2',
          completed: true
        },],
        week2: [{
          weekday: 'WEDNESDAY',
          title: 'Test week 2 1',
          completed: false
        }, {
          weekday: 'FRIDAY',
          title: 'Test week 2 2',
          completed: true
        },],

      }

    }
    const useDataProviderMock = useDataProvider as jest.MockedFunction<typeof useDataProvider>
    useDataProviderMock.mockReturnValue([mockState, mockDispatch ])


    jest.clearAllMocks()
    MockDate.reset()
    MockDate.set('2021-8-17') // set today tothis date
    const testingMonth = 2
    const testingYear = 2020
    render(
      <DataProvider>
        <MemoryRouter initialEntries= {[`/mock/${testingYear }/${testingMonth+1 }`]}>
          <Route exact path={['/','/mock/:year/:month', '/mock/:year/:month/:day', '/*']} component={App} />
        </MemoryRouter>
      </DataProvider>
    )

    const dispatchedData = mockDispatch.mock.calls[0][0].payload
    const daysInMonth = getDaysInMonth(testingMonth ,testingYear)

    for (let i = 1 ; i<= daysInMonth; i++ ){
      const onDate = new Date(testingYear,testingMonth,i)
      const weekNo = getTreatmentWeekNumber(onDate)
      const dayNum  = getDayNumber(onDate)
      if( weekNo &&  [0,2,4].includes(dayNum)){
        const weekMatch = mockState.data[`week${weekNo}` as WeeklyDataKey]
        const dayMatch  = weekMatch && weekMatch.filter( daydata =>  getDayNumberFromString(daydata.weekday) === dayNum)
        if ( dayMatch && dayMatch[0] ){
          expect(dispatchedData.data[i]).toEqual(dayMatch[0])
        }

      }

    }
  })
})

