import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import "./Results.css";

function Results() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateScore = location.state?.score;
  const stateTotal = location.state?.total;

  let score = typeof stateScore === "number" ? stateScore : undefined;
  let total = typeof stateTotal === "number" ? stateTotal : undefined;

  if (score === undefined || total === undefined) {
    const saved = JSON.parse(localStorage.getItem(`test-${id}-myResult`)) || {};

    if (score === undefined) {
      score = typeof saved.score === "number" ? saved.score : Number(localStorage.getItem(`test-${id}-score`)) || 0;
    }

    if (total === undefined) {
      total = typeof saved.total === "number" ? saved.total : (() => {
        const tests = JSON.parse(localStorage.getItem("tests")) || [];
        const test = tests.find(t => t.id === Number(id));
        return test?.questions?.length || 0;
      })();
    }
  }

  if (total === 0) {
    return <p>No results available for this test.</p>;
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
