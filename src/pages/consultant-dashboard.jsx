import React from "react";
import { useNavigate} from "react-router-dom";
import './styles/Consultant-Dashboard.css';
import fdmLogo from './styles/images/FDMlogo.png';
import calendar from './styles/images/calendar_icon.png';
import notif from './styles/images/notif_icon.png';
import log_out from './styles/images/log_out.png';
import profile from './styles/images/profile_icon.png';
import submit_expense from './styles/images/submit_expense_icon.png';
import submit_leave from './styles/images/submit_leave_icon.png';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
      <div className="dashboard-container">
        <img src={fdmLogo} alt="FDM Logo" className="Logo" />
        <br></br>
        <button onClick={() => navigate("/work-schedule")} className="buttons"><img src={calendar} className="icon"></img> <br/>Work Schedule</button>
        <div className="row">
          <button onClick={() => navigate("/submit-leave")} className="buttons"> <img src={submit_leave} className="icon"></img> <br/> Submit Leave</button> 
          <button onClick={() => navigate("/submit-expense")} className="buttons"> <img src={submit_expense} className="icon"></img> <br/> Submit Expense</button>
          </div>
          <div className="row">
          <button onClick={() => navigate("/view-notifications")} className="buttons"> <img src={notif} className="icon"></img> <br/> Notifications</button>
          <button onClick={() => navigate("/update-info")} className="buttons"> <img src={profile} className="icon"></img> <br/> Profile</button>

          </div>
              <button onClick={handleLogout} className="Logout">
              <img src={log_out} className="icon"></img> Logout
              </button>
      </div>
  );
}

export default Dashboard;