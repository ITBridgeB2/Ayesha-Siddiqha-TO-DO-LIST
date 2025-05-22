import React from "react";
import{ Route,Routes } from 'react-router-dom';
import TaskForm from "./taskForm";
import TaskUpdate from "./TaskUpdate";
import TaskList from "./taskList";

function App(){
  return(
    <Routes>
    <Route path="/" element={<TaskForm/>}/>
    <Route path="/TaskUpdate/:id" element={<TaskUpdate/>}/>
    <Route path="/taskList" element={<TaskList/>}/>
    </Routes>
  )
}
export default App;



















































