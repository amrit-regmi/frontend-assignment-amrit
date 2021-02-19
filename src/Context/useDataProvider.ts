import { useContext } from 'react'
import { StoreContext } from './DataProvider'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDataProvider = () => useContext(StoreContext)