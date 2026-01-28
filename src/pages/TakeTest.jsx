import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./TakeTest.css";

function TakeTest({ tests }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the test by ID
  const test = tests.find(t => t.id === parseInt(id));

  // Mock questions (replace with backend  )
  const mockQuestions = [
    { id: 1, question: "What is 2 + 2?", options: ["1", "2", "3", "4"], answer: "4" },
    { id: 2, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { id: 3, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    // Load partial answers from localStorage if any
    const saved = localStorage.getItem(`test-${id}-answers`);
    return saved ? JSON.parse(saved) : {};
  });

   
  const [timeLeft, setTimeLeft] = useState(150);

   
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(true); // auto-submit when timer runs out
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // --- Save partial answers whenever selectedAnswers changes ---
  useEffect(() => {
    localStorage.setItem(`test-${id}-answers`, JSON.stringify(selectedAnswers));
  }, [selectedAnswers, id]);

  if (!test) return <p>Test not found</p>;

  const currentQuestion = mockQuestions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSubmit = (auto = false) => {
    console.log(auto ? "Auto-submitted answers:" : "Submitted answers:", selectedAnswers);
      let score = 0;
      mockQuestions.forEach(q => {
        if (selectedAnswers[q.id] === q.answer) {
          score += 1;
        }
    });

  // Save in localStorage or navigate with state
    localStorage.setItem(`test-${id}-score`, score);

    // Clear saved answers for this test
    localStorage.removeItem(`test-${id}-answers`);

    alert(auto ? "Time's up! Test submitted automatically." : "Test submitted!");
    navigate(`/results/${id}`, { state: { score } });
  };

  // Timer display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="take-test-container">
      <h2>{test.title}</h2>
      <p>Duration: {test.duration}</p>
      <p>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

      <div className="question-card">
        <h3>Q{currentQuestionIndex + 1}. {currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map(option => (
            <Button
              key={option}
              type={selectedAnswers[currentQuestion.id] === option ? "primary" : "secondary"}
              onClick={() => handleOptionSelect(option)}
              disabled={timeLeft <= 0} // prevent changing after auto-submit
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && <Button onClick={handlePrevious} disabled={timeLeft <= 0}>Previous</Button>}
        {currentQuestionIndex < mockQuestions.length - 1 ? (
          <Button onClick={handleNext} disabled={timeLeft <= 0}>Next</Button>
        ) : (
          <Button onClick={() => handleSubmit()} disabled={timeLeft <= 0}>Submit Test</Button>
        )}
      </div>
    </div>
  );
}

export default TakeTest;



