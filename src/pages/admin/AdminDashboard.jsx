import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import './AdminDashboard.css';
import Button from '../../components/Button.jsx';
import AddQuestions from './Add-questions.jsx';
import AdminProfile from '../../components/AdminProfile.jsx';
import Footer from '../../components/Footer.jsx';

function AdminDashboard({ deleteTest}) {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const storedTests = JSON.parse(localStorage.getItem("tests")) || [];
    setTests(storedTests);
  }, []);
  useEffect(() => {
  const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, []);


  const handleDelete = (id) => {
    const tests = JSON.parse(localStorage.getItem("tests")) || [];

    const testToDelete = tests.find((test) => test.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${testToDelete.title}"?`
    );
    if (!confirmDelete) return;

    const updatedTests = tests.filter((test) => test.id !== id);

    localStorage.setItem("tests", JSON.stringify(updatedTests));

    setTests(updatedTests);
    alert(`"${testToDelete.title}" has been deleted.`);
  };

  const stats = {
    totalStudents: 200,
    totalTests: tests.length,
    testsThisWeek: tests.filter(
      test => test.status === "Not Started"
    ).length
  };

  return (
    <>
      <AdminProfile />
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


          <Button>Manage Students</Button>
        </div>

        {/* Test List */}
        <div className='test-list'>
          <h3>All Tests</h3>
          {tests.length === 0 ? (
            <p>No tests available</p>
          ) : (
            tests.map((test) => (
              <div key={test.id} className="test-card">
                <h3>{test.title}</h3>
                <p>Duration: {test.duration} minutes</p>
                <p>Questions: {test.questions?.length || 0}</p>

                <div className='test-actions'>
                  <Button type="secondary" onClick={() => navigate(`/admin/results/${test.id}`)}>
                    View Results
                  </Button>
                  <Button type='primary' onClick={() => navigate(`/admin/add-questions/${test.id}`)}>
                    Add Questions
                  </Button>
                  <Button type='secondary' onClick={() => navigate('/admin/create-test', { state: { test } })}>
                    Edit
                  </Button>

                  <Button
                    type="danger"
                    onClick={() => handleDelete(test.id)}
                  >
                    Delete
                  </Button>


                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;


