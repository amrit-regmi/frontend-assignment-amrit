import reducer from '../Reducer/reducer'
import { updateMonthToCalender } from '../Reducer/actions'
import { MonthData } from '../Types/types'
import MockDate from 'mockdate'


describe('testing reducer and actions' , () => {
  MockDate.set('2021-2-17')

  test ('adding a entry initalizes empty calender with  year month and date with actions , and adds to specefied date', () => {
    const state = { calender:{} }
    const payLoadData:MonthData = {
      1: {
        weekday: 'MONDAY',
        title:'Testing context',
        completed: true
      }
    }
    const newState = reducer(state, updateMonthToCalender(2020,1, payLoadData))

    const data = newState.calender[2020] && newState.calender[2020][1]
    expect (data).toEqual(payLoadData)
  })

  test ('If year exists then only month data is updated', () => {
    const state = { calender:{} }
    const payLoadData:MonthData = {
      10: {
        weekday: 'MONDAY',
        title:'Testing context',
        completed: true
      }
    }
    const newState = reducer(state, updateMonthToCalender(2020,1, payLoadData))

    const data = newState.calender[2020] && newState.calender[2020][1]
    expect (data).toEqual(payLoadData)

    const newPayloadData:MonthData = {
      15: {
        weekday: 'MONDAY',
        title:'Testing context',
        completed: true
      }
    }

    const newState1 = reducer(newState, updateMonthToCalender(2020,1, newPayloadData))

    const data1 = newState1.calender[2020] && newState1.calender[2020][1]
    expect (data1).toEqual(newPayloadData)
  })


})
afterAll(() => MockDate.reset())