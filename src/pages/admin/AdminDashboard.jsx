import React from 'react';
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';
import Button from '../../components/Button.jsx';

function AdminDashboard({ tests }) {
  const navigate = useNavigate();

  const stats = {
    totalStudents: 200,
    totalTests: tests.length,
    testsThisWeek: tests.filter(
      test => test.status === "Not Started"
    ).length
  };

  return (
    <div className='AdminDashboardContainer'>
      <h2 className='adminheading'>Admin Dashboard</h2>

      {/* Stats */}
      <div className='Statistics'>
        <div className='cardStyle'>
          <h4>Total Students</h4>
          <p>{stats.totalStudents}</p>
        </div>

        <div className='cardStyle'>
          <h4>Total Tests</h4>
          <p>{stats.totalTests}</p>
        </div>

        <div className='cardStyle'>
          <h4>Active Tests</h4>
          <p>{stats.testsThisWeek}</p>
        </div>
      </div>

      {/* Actions */}
      <div className='admin-actions'>
        <Button onClick={() => navigate('/admin/create-test')}>
          Create New Test
        </Button>
        <Button type='secondary'>View Results</Button>
        <Button>Manage Students</Button>
      </div>

      {/* Test List */}
      <div className='test-list'>
        <h3>All Tests</h3>
        {tests.map(test => (
          <div key={test.id} className="test-card">
            <h4>{test.title}</h4>
            <p>Duration: {test.duration}</p>
            <p>Total Questions: {test.totalQuestions}</p>
            <p>Status: {test.status}</p>

            <div className='test-actions'>
              <Button type='secondary' onClick={() => console.log("Edit", test.id)}>
                Edit
              </Button>
              <Button onClick={() => console.log("Delete", test.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;


