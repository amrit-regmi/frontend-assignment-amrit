import React, { FC } from 'react';
import Calender from './Components/Calender';
import Header from './Components/Header';

const App:FC = () => {
  return (
    <div className='container'>
      <Header title='Weekly Program'></Header>
      <Calender currentMonth={1} currentYear={2020}/>
    </div>
    
  );
}

export default App;
