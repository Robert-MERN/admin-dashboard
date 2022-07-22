import React, { useEffect } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from "@syncfusion/ej2-react-richtexteditor"

import { Header } from '../components'
import { EditorData } from '../data/dummy'

const Editor = () => {
  const { setFormPage } = useStateContext();
  useEffect(()=>{
      setFormPage(true);
  })
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg' >
      <Header title="Editor" category="App" />
      <RichTextEditorComponent>
        <EditorData/>
        <Inject services={[HtmlEditor, Image, Link, QuickToolbar, Toolbar]} />
      </RichTextEditorComponent>

    </div>
  )
}

export default Editor