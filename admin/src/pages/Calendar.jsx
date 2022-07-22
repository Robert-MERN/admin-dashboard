import React, { useEffect } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from "@syncfusion/ej2-react-schedule";
import { scheduleData } from '../data/dummy';
import { Header } from '../components';

const Calendar = () => {
  const { setFormPage } = useStateContext();
  useEffect(()=>{
      setFormPage(true);
  })
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg' >
      <Header title="Calendar" category="App" />
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={ new Date(2021, 0, 10) }
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
      </ScheduleComponent>
    </div>
  )
}

export default Calendar