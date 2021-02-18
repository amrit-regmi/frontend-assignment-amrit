import React, { useReducer, createContext, FC, Dispatch, useMemo, useContext } from 'react'
import { Store, CalenderAction, Calender, WeeklyData  } from '../Types/types'
import reducer from './reducer'
import data from './data.json'


const newTypedData:WeeklyData = {}
const typedData = Object.assign(data,newTypedData) //TypeCast JSON data

const initialState:{calender:Calender, data: WeeklyData} = { calender: {} , data:typedData   } // we can also write reducer function for data but since it is hardcoded we leave this step

export const StoreContext = createContext<[Store, Dispatch<CalenderAction>]>([
  initialState,
  () => initialState
])

export type ProviderValue = [Store, Dispatch<CalenderAction>]

export const DataProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer ( reducer, initialState)
  const memoisedStore = useMemo<ProviderValue>(() => [state, dispatch], [state])
  return (
    <StoreContext.Provider value ={memoisedStore}>
      {children}
    </StoreContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDataProvider = () => useContext(StoreContext)