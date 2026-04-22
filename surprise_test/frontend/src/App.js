import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    // BrowserRouter acts like a traffic cop, directing which page to show
    <BrowserRouter>
      <Routes>
        {/* If the user goes to the exact homepage ("/"), redirect them to the Login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Our custom pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* We haven't built Dashboard yet, so let's just put placeholder text for now */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;