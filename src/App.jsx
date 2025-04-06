import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import ConsultantDashboard from './pages/consultant-dashboard'
import ManagerDashboard from "./pages/manager-dashboard";
import WorkSchedule from './pages/Work-Schedule';
import Register from "./pages/Register.jsx";
import UpdateInfo from "./pages/Update-Info.jsx";
import SubmitExpense from "./pages/Submit-Expense.jsx";
import SubmitLeave from "./pages/Submit-Leave.jsx";
import ConsultantInfo from "./pages/Consultant-Info.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/consultant-dashboard" element={<ConsultantDashboard />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                <Route path="/Register" element={<Register />}/>
                <Route path="/update-info" element={<UpdateInfo />} />
                <Route path="/work-schedule" element={<WorkSchedule />}/>
                <Route path="/submit-expense" element={<SubmitExpense />}/>
                <Route path="/submit-leave" element={<SubmitLeave />}/>
                <Route path="/consultant-info" element={<ConsultantInfo />}/>
            </Routes>
        </Router>
    );
}

export default App;