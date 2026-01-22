import { useState } from "react";
import Button from "../../components/Button";
import React from "react";
import './CreateTest.css';
import { useNavigate } from "react-router-dom";


function CreateTest({ addTest }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTest = {
      id: Date.now(),
      title,
      duration,
      status: "Not Started",
      totalQuestions
    };

    addTest(newTest);

    setTitle("");
    setDuration("");
    setTotalQuestions("");

    alert("Test created successfully!");
    navigate("/admin");
  };


  return (
    <form className="create-test-form" onSubmit={handleSubmit}>
      <h2>Create Test</h2>

      <input placeholder="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="duration" name="duration" value={duration} onChange={e => setDuration(e.target.value)} />
      <input placeholder="total questions" name="totalQuestions" value={totalQuestions} onChange={e => setTotalQuestions(e.target.value)} />
      
      <Button type="primary"  onSubmit={handleSubmit}>Create Test</Button>
    </form>
  );
}

export default CreateTest;

