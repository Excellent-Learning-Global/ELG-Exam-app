import React from 'react'
import Button from '../components/Button.jsx';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TakeTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Static questions for now
  const questions = [
    {
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "6"]
    },
    {
      text: "What is the capital of Nigeria?",
      options: ["Lagos", "Abuja", "Kano", "Ibadan"]
    },
    {
      text: "Which planet is known as Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [timeLeft, setTimeLeft] = useState(150); // 2.5 min per test

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (opt) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = opt;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    alert("Your answers: " + JSON.stringify(answers));
    navigate("/dashboard");
  };
  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h2>Test ID: {id}</h2>
      <p>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

      <h3>Question {currentIndex + 1}: {questions[currentIndex].text}</h3>

      {questions[currentIndex].options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name={`q${currentIndex}`}
            value={opt}
            checked={answers[currentIndex] === opt}
            onChange={() => handleOptionChange(opt)}
          />{" "}
          {opt}
        </label>
      ))}

      <div style={{ marginTop: "20px" }}>
        <Button  type='outline' onClick={handlePrev} disabled={currentIndex === 0} >
          Previous
        </Button>
        {currentIndex < questions.length - 1 ? (
          <Button type='outline' onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Test</Button>
        )}
      </div>
    </div>
  );
}

export default TakeTest;

