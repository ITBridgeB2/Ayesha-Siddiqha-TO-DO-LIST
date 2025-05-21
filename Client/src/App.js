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



















































// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;























































// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import TaskForm from './taskForm';
// import TaskUpdate from './TaskUpdate';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={TaskForm} />
//         <Route path="/update/:id" component={TaskUpdate} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;
