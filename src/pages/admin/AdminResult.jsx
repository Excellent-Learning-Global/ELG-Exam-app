import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./AdminResult.css";

function AdminResults() {
  const navigate = useNavigate();

  // Mock submissions 
  const submissions = [
    {
      id: 1,
      studentName: "John Doe",
      score: 8,
      total: 10
    },
    {
      id: 2,
      studentName: "Mary Smith",
      score: 4,
      total: 10
    }
    ,
    {
      id: 3,
      studentName: "Pan Chan",
      score: 2,
      total: 10
    }
  ];

  return (
    <div className="admin-results-container">
      <h2>Test Submissions</h2>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map(sub => {
            const percentage = Math.round((sub.score / sub.total) * 100);
            const passed = percentage >= 50;

            return (
              <tr key={sub.id}>
                <td>{sub.studentName}</td>
                <td>{sub.score}/{sub.total}</td>
                <td>{percentage}%</td>
                <td className={passed ? "pass" : "fail"}>
                  {passed ? "Pass" : "Fail"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button onClick={() => navigate("/admin")}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default AdminResults;
