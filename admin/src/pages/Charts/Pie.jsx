import React, { useEffect } from 'react';
import { pieChartData } from '../../data/dummy';
import { Header, Pie as PieChart } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';

const Pie = () => {
  useEffect(()=>{
    setFormPage(true);
})
const { setFormPage }  =useStateContext();
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
    <Header category="Chart" title="Line Chart" />
    <div className="w-full">
      <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
    </div>
  </div>
  )
}

export default Pie