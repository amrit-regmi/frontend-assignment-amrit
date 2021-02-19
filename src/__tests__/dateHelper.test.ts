import {
  getDaysInMonth ,getFirstDayOfMonth ,
  getDayNumber ,getTotalWeekSpanForMonth, isToday,
  isDateEqual} from '../Utils/dateHelper' ;

describe('Testing Date Helper Function' ,() => {
  describe('getDaysinMonth', () => {
    test('days in Feb 2020 is 29 ', () => {
      expect(getDaysInMonth(1,2020)).toBe(29)
    })
    test('days in Feb 2021 is 28 ', () => {
      expect(getDaysInMonth(1,2021)).toBe(28)
    })
  })
  
  describe('getFirstDayofMonth', () => {
    test('first day of Feb 2020 is 5 saturday', () => {
      expect(getFirstDayOfMonth(1,2020)).toBe(5)
    })
    test('first day of Feb 2021 is 0 Monday ', () => {
      expect(getFirstDayOfMonth(1,2021)).toBe(0)
    })
  })

  describe('getDayNumber', () => {
    test('daynumber for Feb 7 2021 is 6 Sunday', () => {
      expect(getDayNumber(new Date(2021,1,7))).toBe(6)
    })
  })

  describe('getTotalWeekSpanForMonth', () => {
    test('total week-span in Feb 2021 to be 4', () => {
      expect(getTotalWeekSpanForMonth(1,2021)).toBe(4)
    })
    test('total week-span in August 2021 to be 6', () => {
      expect(getTotalWeekSpanForMonth(7,2021)).toBe(6)
    })
    test('total week-span in March 2020 to be 5', () => {
      expect(getTotalWeekSpanForMonth(2,2021)).toBe(5)
    })
  })

  describe('isToday', () => {
    const today = new Date()
    const tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
    const yesterday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
    test('testing with todays date will return true', () => {
      expect(isToday(today)).toBe(true)
    })
    test('testing with tommorow date date will return false', () => { 
      expect(isToday(tomorrow)).toBe(false)
    })
    test('testing with yestarday date date will return false', () => { 
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('isDateEqual', () => {
    const date1 = new Date()
    const date2 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()+1,0,12,0)
  
    test('testing with tow equal date will return true', () => {
      expect(isDateEqual(date1,date1)).toBe(true)
    })
    test('testing with todays/tommorow date date will return true', () => { 
      expect(isDateEqual(date1,date2)).toBe(false)
    })
  })


})