import React from "react";
import { useNavigate} from "react-router-dom";
import './styles/Consultant-Dashboard.css';
import fdmLogo from './styles/images/FDMlogo.png';


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
          <button onClick={() => navigate("/work-schedule")} className="buttons">📅 Work Schedule</button>
          <button onClick={() => navigate("/submit-leave")} className="buttons">📝 Submit Leave</button>
          <button onClick={() => navigate("/submit-expense")} className="buttons">💰 Submit Expense</button>
          <button onClick={() => navigate("/view-notifications")} className="buttons">🔔 Notifications</button>
          <button onClick={() => navigate("/update-info")} className="buttons">👤 Profile</button>
          <div className="Logout">
              <button onClick={handleLogout} style={{backgroundColor: "red", color: "white"}}>
                  🚪 Logout
              </button>
          </div>
      </div>
  );
}

export default Dashboard;