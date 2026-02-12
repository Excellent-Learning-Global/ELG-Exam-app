import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './Dashboard.css';
import Button from '../components/Button.jsx';




function Dashboard({ tests }) {
  const navigate = useNavigate();
  // console.log("Student dashboard tests:", tests);
  useEffect(() => {
  const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Student Dashboard</h2>

      <div className="test-list">
        {tests.length === 0 && (
          <p>No tests available at the moment.</p>
        )}

        {tests.map(test => (
          <div key={test.id} className="test-card">
            <h3>{test.title}</h3>

            <p>Duration: {test.duration}</p>
            <p>Status: {test.status}</p>

            {test.status === "Completed" ? (
              <Button type="secondary">
                View Result
              </Button>
            ) : (
              <Button onClick={() => navigate(`/test/${test.id}`)}>
                Start Test
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

