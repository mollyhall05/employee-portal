import React from "react";
import { useNavigate} from "react-router-dom";
import './styles/Consultant-Dashboard.css';
import fdmLogo from './styles/images/FDMlogo.png';
import calendar from './styles/images/calendar_icon.png';
import notif from './styles/images/notif_icon.png';
import expense from './styles/images/submit_expense_icon.png';
import log_out from './styles/images/log_out.png';

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
        <img src={fdmLogo} alt="FDM Logo" className="Logo" />
        <br></br>
        
        <button onClick={() => navigate("/post-notification")} className="buttons"><img src={notif} className="icon"></img> <br/>Post Notification</button>
            
        <div className="row">
            <button onClick={() => navigate("/approve-expenses")} className="buttons"><img src={expense} className="icon"></img> <br/> Approve Expenses</button>
            <button onClick={() => navigate("/approve-leave")} className="buttons"><img src={calendar} className="icon"></img> <br/>Approve Leave</button>
        </div>
            <button onClick={handleLogout} className="Logout">
            <img src={log_out} className="icon"></img> Logout
            </button>
    </div>
  );
}

export default ManagerDashboard;