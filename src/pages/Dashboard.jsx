import React from 'react'
import { useNavigate } from "react-router-dom";

const tests = [
  {
    id: 1,
    title: "Weekly Test 1",
    duration: "30 mins",
    status: "Not Started"
  },
  {
    id: 2,
    title: "Monthly Exam",
    duration: "1 hour",
    status: "Completed"
  }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Available Tests</h2>

      {tests.map(test => (
        <div key={test.id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>{test.title}</h3>
          <p>Duration: {test.duration}</p>
          <p>Status: {test.status}</p>

          {test.status === "Completed" ? (
            <button>View Result</button>
          ) : (
            <button onClick={() => navigate(`/test/${test.id}`)}>
              Start Test
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

