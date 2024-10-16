import React from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TodoList from './components/TodoList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/todolist" element={<TodoList />} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
