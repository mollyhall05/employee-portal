import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import ConsultantDashboard from './pages/consultant-dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/consultant-dashboard" element={<ConsultantDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;