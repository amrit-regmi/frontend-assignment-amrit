import React, { FC } from 'react';
import Calender from './Components/Calender';
import Header from './Components/Header';
import { DataProvider } from './Context.tsx/DataProvider';

const App:FC = () => {
  return (
    <div className='container'>
      <Header title='Weekly Program'></Header>
      <DataProvider>
        <Calender currentMonth={1} currentYear={2020}/> 
      </DataProvider> 
    </div>
    
  );
}

export default App;
