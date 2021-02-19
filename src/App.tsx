import React, { FC } from 'react';
import Calender from './Components/Calender';
import Header from './Components/Header';
import { DataProvider } from './Context/DataProvider';

const App:FC = () => {
  return (
    <div className='container'>
      <Header title='Weekly Program'></Header>
      <DataProvider>
        <Calender currentMonth={1} currentYear={2021}/> 
      </DataProvider> 
    </div>
    
  );
}

export default App;
