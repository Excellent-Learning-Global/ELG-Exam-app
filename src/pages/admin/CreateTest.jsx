import { useState } from "react";
import Button from "../../components/Button";
import React from "react";
import './CreateTest.css';
import { useLocation, useNavigate } from "react-router-dom";



function CreateTest({ addTest, editTest }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTest = location.state?.test;

  const [title, setTitle] = useState(editingTest?.title || "");
  const [duration, setDuration] = useState(editingTest?.duration || "");
  const [totalQuestions, setTotalQuestions] = useState(editingTest?.totalQuestions || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTest = {
      id: editingTest?.id || Date.now(),
      title,
      duration,
      status: editingTest?.status || "Not Started",
      totalQuestions
    };

    if (editingTest) {
      editTest(newTest); // update existing test
    } else {
      console.log("Adding new test:", newTest);
      addTest(newTest);  // add new test
    }

    // Clear form and redirect
    setTitle("");
    setDuration("");
    setTotalQuestions("");
    
    navigate("/dashboard");
  };

  return (
    <form className="create-test-form" onSubmit={handleSubmit}>
      <h2>{editingTest ? "Edit Test" : "Create Test"}</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Test Title" />
      <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration in minutes" />
      <input value={totalQuestions} onChange={e => setTotalQuestions(e.target.value)} placeholder="Total Questions" />

      <button type="submit">{editingTest ? "Update Test" : "Create Test"}</button>
    </form>
  );
}


export default CreateTest;

