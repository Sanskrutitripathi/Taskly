import React from 'react';
import { Routes, Route } from "react-router-dom";
import TaskForm from './TaskForm';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import ResetPassword from './Auth/ResetPassword';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/resetpassword" element={<ResetPassword />} />


      <Route path="/task" element={<TaskForm />} />
        
    </Routes>
  );
}

export default App;
