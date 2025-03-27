import React from "react";
import { useNavigate} from "react-router-dom";

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
      <div style={{textAlign: "center", padding: "20px"}}>
          <h2>Manager Dashboard</h2>
          <p>Welcome! Here are your options:</p>

          <div style={{marginTop: "20px"}}>
              <button onClick={handleLogout} style={{backgroundColor: "red", color: "white"}}>
                  🚪 Logout
              </button>
          </div>
      </div>
  );
}

export default ManagerDashboard;