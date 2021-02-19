import reducer from '../Reducer/reducer'
import { updateToCalender } from '../Reducer/actions'
import { MonthNumber, Program } from '../Types/types'
import MockDate from 'mockdate'


describe('testing reducer and actions' , () => {
  MockDate.set('2021-2-17')

  test('adding a entry initalizes empty calender with  year month and days , and adds to specefied date', () => {
    const state = { calender:{} }
    const payLoadData:Program = {
      weekday: 'MONDAY',
      title:'Testing context',
      completed: true
    }
    const newState = reducer(state, updateToCalender(new Date(2020,1,1), payLoadData))

    const data = newState.calender[2020] && newState.calender[2020][1]
    //expect(data && data.length).toBe(29)
    expect (data[0]).toEqual(payLoadData)
  })

  describe('Activites are currectly updated to state', () => {
    const state = { calender:{} }
    const today = new Date()
    const payLoads = [...new Array(4)].map((payload,index) => {
      const payLoadData:Program = {
        weekday: 'MONDAY',
        title:`Testing context ${index}`,
        completed: false
      }
      return payLoadData
    })

    test('If a user has not completed an activity in the past, the activity will be moved to the current day',() => {

      const pastDate = new Date(2021,1,8)
      const newState0 = reducer(state,updateToCalender(pastDate, payLoads[0]))
      const data = newState0.calender[2021] && newState0.calender[2021][1]

      expect (data[today.getDate()-1]).toEqual(payLoads[0])
      expect (data [pastDate.getDate()-1]).toBeUndefined

    })

    test('Multiple incomplete activities in the past, the first incomplete activity will be displayed today, the second tomorrow, and so forth',() => {
      const pastDate = new Date(2021,1,6)
      const newState0 = reducer(state,updateToCalender(pastDate, payLoads[0]))
      const newState1 = reducer(newState0,updateToCalender(new Date(2021,1,8), payLoads[1]))
      const newState2 = reducer(newState1,updateToCalender(new Date(2021,1,10), payLoads[2]))
      const data = newState2.calender[2021] && newState2.calender[2021][1]

      expect (data[today.getDate()-1]).toEqual(payLoads[0])
      expect (data[today.getDate()]).toEqual(payLoads[1])
      expect (data[today.getDate()+1]).toEqual(payLoads[2])

    })

    test('Completed activity on the past will be added to past date',() => {
      const pastDate = new Date(today.getFullYear(),today.getMonth()-1, today.getDay()-5)
      const completeData  = { ...payLoads[3],completed:true }
      const newState = reducer(state,updateToCalender(pastDate, completeData))
      const data = newState.calender[pastDate.getFullYear()][pastDate.getMonth() as MonthNumber]
      expect(data[pastDate.getDate()-1]).toEqual(completeData)
    })

    test('Activites are added to corresponding dates regardless of copleted status ff not in current month',() => {
      const pastDate = new Date(today.getFullYear(),today.getMonth()-1, 2)
      const newState = reducer(state,updateToCalender(pastDate, payLoads[3]))
      const data = newState.calender[pastDate.getFullYear()][pastDate.getMonth() as MonthNumber]
      expect(data[pastDate.getDate()-1]).toEqual(payLoads[3])

    })

  })
})
afterAll(() => MockDate.reset())