import React, { useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';

import { Header, LineChart } from "../../components";

const Line = () => {
  useEffect(()=>{
    setFormPage(true);
})
const { setFormPage }  =useStateContext();
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header category="Chart" title="Line Chart" />
      <div className='w-full' >
        <LineChart/>
      </div>
    </div>
  )
}

export default Line