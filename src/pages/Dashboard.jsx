import React from 'react'
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import Button from '../components/Button.jsx';

const tests = [
  {
    id: 1,
    title: "Weekly Test 1",
    duration: "30 mins",
    totalQuestions: 20,
    status: "Not Started"
  },
  {
    id: 2,
    title: "Monthly Exam",
    duration: "1 hour",
    totalQuestions: 40,
    status: "Completed"
  }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{padding:"20px"}}>
      <h1>Student Dashboard</h1>
      <h3 className='title'>Available Tests</h3>
      <div className='container'>
        {tests.map(test => (
          <div key={test.id} className='questionsLayout' >
            <h3 className='testtitle'>{test.title}</h3>
            <p className='duration'>Duration: {test.duration}</p>
            <p className='questions'>Questions: {test.totalQuestions} </p>
            <p className='teststatus'>Status: {test.status}</p>

            {test.status === "Completed" ? (
              <>
                <Button type='secondary' onClick={() => navigate('/results/:id')}>View Result</Button>
              </>
              
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

