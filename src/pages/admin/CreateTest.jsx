import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreateTest.css";

function CreateTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTest = location.state?.test;

  const [title, setTitle] = useState(editingTest?.title || "");
  const [duration, setDuration] = useState(editingTest?.duration || "");
  const [totalQuestions, setTotalQuestions] = useState(
    editingTest?.totalQuestions || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !duration || !totalQuestions) {
      alert("All fields are required!");
      return;
    }

    if (duration <= 0 || totalQuestions <= 0) {
      alert("Duration and Total Questions must be greater than 0");
      return;
    }

    const newTest = {
      id: editingTest?.id || Date.now(),
      title,
      duration: Number(duration),
      totalQuestions: Number(totalQuestions),
      status: editingTest?.status || "Not Started",
      questions: editingTest?.questions || []
    };

    const existingTests = JSON.parse(localStorage.getItem("tests")) || [];

    let updatedTests;

    if (editingTest) {
      updatedTests = existingTests.map((test) =>
        test.id === editingTest.id ? newTest : test
      );
    } else {
      updatedTests = [...existingTests, newTest];
    }

    localStorage.setItem("tests", JSON.stringify(updatedTests));

    alert(editingTest ? "Test Updated!" : "Test Created Successfully!");

    navigate("/admin");
  };

  return (
    <form className="create-test-form" onSubmit={handleSubmit}>
      <h2>{editingTest ? "Edit Test" : "Create Test"}</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Test Title"
      />

      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration in minutes"
      />

      <input
        type="number"
        value={totalQuestions}
        onChange={(e) => setTotalQuestions(e.target.value)}
        placeholder="Total Questions"
      />

      <button type="submit">
        {editingTest ? "Update Test" : "Create Test"}
      </button>
    </form>
  );
}

export default CreateTest;


