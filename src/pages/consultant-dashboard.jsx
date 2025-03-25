import React from "react";
import { useNavigate} from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
      <div style={{textAlign: "center", padding: "20px"}}>
          <h2>Employee Dashboard</h2>
          <p>Welcome! Here are your options:</p>

          <button onClick={() => navigate("/work-schedule")}>📅 Work Schedule</button>
          <button onClick={() => navigate("/submit-leave")}>📝 Submit Leave</button>
          <button onClick={() => navigate("/submit-expense")}>💰 Submit Expense</button>
          <button onClick={() => alert("Viewing Notifications")}>🔔 Notifications</button>
          <button onClick={() => navigate("/update-info")}>👤 Profile</button>
          <div style={{marginTop: "20px"}}>
              <button onClick={handleLogout} style={{backgroundColor: "red", color: "white"}}>
                  🚪 Logout
              </button>
          </div>
      </div>
  );
}

export default Dashboard;