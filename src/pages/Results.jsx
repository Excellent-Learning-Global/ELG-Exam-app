import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import "./Results.css";

function Results() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let score = location.state?.score;
  let total = location.state?.total ; 


  // if (score === undefined) {
  //   return <p>No results available for this test.</p>;
  // }
  if (score === undefined) {
    score = Number(localStorage.getItem(`test-${id}-score`)) || 0;

    const tests = JSON.parse(localStorage.getItem("tests")) || [];
    const test = tests.find(t => t.id === Number(id));
    total = test?.questions?.length || 0; 

  }
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 50;

  return (
    <div className="results-container">
      <h2>Test Results</h2>

      <div className="score-card">
        <h3>{passed ? "🎉 Passed" : "❌ Failed"}</h3>
        <p className="score-text">
          {score} / {total}
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="percentage">{percentage}%</p>
      </div>

      <Button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default Results;
