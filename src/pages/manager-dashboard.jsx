import React from "react";
import { useNavigate} from "react-router-dom";

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
      <div style={{backgroundColor: 'white'}}>
          <h2>Manager Dashboard</h2>
          <p>Welcome! Here are your options:</p>

          <div style={{marginTop: "20px"}}>
              <button onClick={() => navigate("/post-notification")} style={{marginRight: "10px"}}>
                  📢 Post Notification
              </button>
              <button onClick={() => navigate("/approve-expenses")} style={{marginRight: "10px"}}>
                  ✅ Approve Expenses
              </button>
              <button onClick={() => navigate("/approve-leave")} style={{marginRight: "10px"}}>
                  ✅ Approve Leave
                </button>
              <button onClick={handleLogout} style={{backgroundColor: "red", color: "white"}}>
                  🚪 Logout
              </button>
          </div>
      </div>
  );
}

export default ManagerDashboard;