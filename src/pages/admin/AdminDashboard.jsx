import React from 'react'
import './AdminDashboard.css';
import Button from '../../components/Button.jsx';

function AdminDashboard() {
  const stats = {
    totalStudents: 200,
    totalTests: 15,
    testsThisWeek: 3
  };

  return (
    <div className='AdminDashboardContainer' >
      <h2 className='adminheading'>Admin Dashboard</h2>

      {/* Stats */}
      <div className='Statistics' >
        <div className='cardStyle'>
          <h4>Total Students</h4>
          <p>{stats.totalStudents}</p>
        </div>

        <div className='cardStyle'>
          <h4>Total Tests</h4>
          <p>{stats.totalTests}</p>
        </div>

        <div className='cardStyle'>
          <h4>Tests This Week</h4>
          <p>{stats.testsThisWeek}</p>
        </div>
      </div>

      {/* Actions */}
      <div className='admin-actions' >
        <Button >Create New Test</Button>
        <Button type='secondary'>View Results</Button>
        <Button>Manage Students</Button>
      </div>
    </div>
  );
}



export default AdminDashboard;
