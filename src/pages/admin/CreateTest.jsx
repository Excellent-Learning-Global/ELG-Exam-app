import React from 'react'

import { useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import "./CreateTest.css"; 

function CreateTest() {
  const navigate = useNavigate();

  // Test information
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30 mins");

  // Questions 
  const [questions, setQuestions] = useState([]);

  // Current question form
  const [qText, setQText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  // Add question
  const addQuestion = () => {
    if (!qText || !answer || options.some(opt => !opt)) {
      alert("Please fill all fields for the question.");
      return;
    }
    setQuestions([...questions, { text: qText, options, answer }]);
    setQText("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  // Remove question
  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  // Mock submittion
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !questions.length) {
      alert("Please enter test title and at least one question.");
      return;
    }
    alert(`Test Created!\nTitle: ${title}\nDuration: ${duration}\nQuestions: ${questions.length}`);
    console.log("Mock Test Data:", { title, duration, questions });
    navigate("/admin");
  };

  return (
    <div className="create-test-container">
      <h2 className="create-test-title">Create New Test</h2>

      {/* Test Info */}
      <div className="create-test-form">
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input-field"
        >
          <option>30 mins</option>
          <option>1 hour</option>
          
        </select>
      </div>

      {/* Add Question */}
      <div className="add-question-section">
        <h3>Add Questions</h3>
        <input
          type="text"
          placeholder="Question Text"
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          className="input-field"
        />

        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            className="input-field"
          />
        ))}

        <input
          type="text"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="input-field"
        />

        <Button type="secondary" onClick={addQuestion}>Add Question</Button>
      </div>

      {/* Questions Preview */}
      {questions.length > 0 && (
        <div className="questions-preview">
          <h3>Questions Preview</h3>
          {questions.map((q, idx) => (
            <div key={idx} className="question-card">
              <strong>{idx + 1}. {q.text}</strong>
              <ul className="options-list">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p><strong>Answer:</strong> {q.answer}</p>
              <Button type="danger" onClick={() => removeQuestion(idx)}>Remove</Button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Test */}
      <div className="submit-section">
        <Button type="primary" onClick={handleSubmit}>Create Test</Button>
      </div>
    </div>
  );
}

export default CreateTest;
