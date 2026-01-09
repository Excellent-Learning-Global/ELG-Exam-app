import React from 'react'
import './Results.css';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button.jsx';

const mockResult = {
  testTitle: "Weekly Mathematics Test",
  score: 10,
  total: 20,
  percentage: "50%",
  status: "Passed"
};

function Results() {
  const navigate = useNavigate();

  return (
    <div >
      <h2 className='testheader'>Test Result</h2>

      <div className='resultcard' >
        <h3>{mockResult.testTitle}</h3>
        <p>Score: {mockResult.score} / {mockResult.total}</p>
        <p>Percentage: {mockResult.percentage}</p>
        <p>Status: {mockResult.status}</p>
      </div>

      <Button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default Results;
