import React, { FC } from 'react'
import Calender from './Components/Calender'
import Header from './Components/Header'
import { DataProvider } from './Context/DataProvider'
import { useParams } from 'react-router-dom'
import { MonthNumber,URLparams } from './Types/types'


const App:FC = () => {
  const today = new Date()
  const params:URLparams = useParams()
  const month = parseInt(params.month) >=1 ? parseInt(params.month)-1: today.getMonth()
  const year = parseInt(params.year) || today.getFullYear()

  return (
    <div className='container'>
      <Header title='Weekly Program'></Header>
      <DataProvider>
        <Calender currentMonth={month as MonthNumber} currentYear={year}/>
      </DataProvider>
    </div>

  )
}

export default App
