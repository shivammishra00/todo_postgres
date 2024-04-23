import React from 'react'
import TodoList from './TodoList'
// import EditTodoList from './EditTodoList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <div>
      <BrowserRouter>
         <Routes>
           <Route path='/todolist' element={ <TodoList/>}></Route>
         </Routes>
      </BrowserRouter>
       
        
    </div>
  )
}

export default App
