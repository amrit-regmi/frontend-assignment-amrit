import { cleanup } from '@testing-library/react'
import reducer from '../Reducer/reducer'
import { updateToCalender } from '../Reducer/actions'
import { Program } from '../Types/types'
import MockDate from 'mockdate'


afterEach(() =>{
  cleanup
  MockDate.reset()
})
describe('testing reducer and actions' , () => {
  test('adding a entry initalizes empty calender with  year month and days , and adds to specefied date', () => {
    const state = {calender:{}}
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

/**calender is populated on ascending order so incase of conflict new action is always later on the order so should always be added to next avalable slot*/
 test('if there is already  activity on given date and the activity are not equal then it will be added to today or next avalible day and so on ', () => {
    const state = {calender:{}}

    MockDate.set('2021-2-17') //Set current date to feb 17

    const today = new Date()
    
    const date = new Date(2021,1,8)
    
    const payLoadData1:Program = {
      weekday: 'MONDAY',
      title:'Testing context 1',
      completed: false
    }

    const payLoadData2:Program = {
      weekday: 'TUESDAY',
      title:'Testing context 2',
      completed: false
    }

    const newState1 = reducer(state,updateToCalender(date, payLoadData1))
    const newState2 = reducer(newState1,updateToCalender(date, payLoadData2))
    const data = newState2.calender[2021] && newState2.calender[2021][1]
    
    expect (data[today.getDate()-1]).toEqual(payLoadData1)
    expect (data[today.getDate()]).toEqual(payLoadData2)

    const payLoadData3:Program = {
      weekday: 'MONDAY',
      title:'Testing context 3',
      completed: false
    }
    const newState3 = reducer(newState2,updateToCalender(date, payLoadData3))

    const newData = newState3.calender[2021] && newState3.calender[2021][1]
    expect (newData[today.getDate()+1]).toEqual(payLoadData3)

    
  })
})