import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const key = `test-${String(id)}-results`;
    console.log(key);
    
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setResults(data);
    console.log(data);
    
  }, [id]);

  const passed = results.filter(r => r.status === "Passed");
  const failed = results.filter(r => r.status === "Failed");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Results</h2>

      <div>
        <p>Total Students: {results.length}</p>
        <p>Passed: {passed.length}</p>
        <p>Failed: {failed.length}</p>
      </div>

      <hr />

      {results.length === 0 ? (
        <p>No students have taken this test yet.</p>
      ) : (
        results.map((r, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderLeft: r.status === "Passed" ? "5px solid green" : "5px solid red"
            }}
          >
            <h3>{r.studentName}</h3>
            <p>Score: {r.score} / {r.total}</p>
            <p>Percentage: {Number(r.percentage).toFixed(1)}%</p>
            <strong>{r.status}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewResults;
