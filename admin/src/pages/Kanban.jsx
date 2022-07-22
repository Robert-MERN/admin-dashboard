import React, { useEffect } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban"
import { Header } from '../components'
import { kanbanGrid, kanbanData } from '../data/dummy'

const Kanban = () => {
  const { setFormPage } = useStateContext();
  useEffect(()=>{
      setFormPage(true);
  })
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header title="Kanban" category="App" />
      <KanbanComponent
        id='kanban'
        cardSettings={{
          contentField: "Summary",
          headerField: "Id"
        }}
        keyField="Status"
        dataSource={kanbanData} >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index}  {...item} />
          ))
          }
        </ColumnsDirective>
      </KanbanComponent>

    </div>
  )
}

export default Kanban