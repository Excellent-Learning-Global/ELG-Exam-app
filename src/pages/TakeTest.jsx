import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./TakeTest.css";

function TakeTest({ tests }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the test by ID
  const [test, setTest] = useState(null);
  useEffect(() => {
    const tests = JSON.parse(localStorage.getItem("tests")) || [];
    const foundTest = tests.find(t => t.id === Number(id));
    setTest(foundTest);
  }, [id]);

  const questions = test?.questions || [];

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

  if (!test) return <p>Loading...</p>;

  if (!test.questions || test.questions.length === 0) {
    return <p>No questions added to this test yet.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: index
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSubmit = (auto = false) => {
    // console.log(auto ? "Auto-submitted answers:" : "Submitted answers:", selectedAnswers);
    // console.log("Questions:", questions);
    // console.log("Selected Answers:", selectedAnswers);
    // console.log("Current Question ID:", currentQuestion.id);
    let score = 0;

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];

      if (selected === q.correctAnswer) {
        score++;
      }
    });
    const updatedTests = tests.map((t) => {
      if (t.id === Number(id)) {
        return { ...t, status: "Completed" };
      }
      return t;
    });
    localStorage.setItem("tests", JSON.stringify(updatedTests));

  // Save in localStorage or navigate with state
    localStorage.setItem(`test-${id}-score`, score);

    // Clear saved answers for this test
    localStorage.removeItem(`test-${id}-answers`);

    alert(auto ? "Time's up! Test submitted automatically." : "Test submitted!");
    navigate(`/results/${id}`, {
      state: {
        score,
        total: questions.length
      }
    });

  };

  // Timer display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="take-test-container">
      <h2>{test.title}</h2>
      <p>Duration: {test.duration} minutes</p>
      <p>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

      <div className="question-card">
        <h3>Q{currentQuestionIndex + 1}. {currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index )=> (
            <Button
              key={option}
              type={selectedAnswers[currentQuestion.id] === index ? "primary" : "secondary"}
              onClick={() => handleOptionSelect(index)}
              disabled={timeLeft <= 0} // prevent changing after auto-submit
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && <Button onClick={handlePrevious} disabled={timeLeft <= 0}>Previous</Button>}
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={handleNext} disabled={timeLeft <= 0}>Next</Button>
        ) : (
          <Button onClick={() => handleSubmit()} disabled={timeLeft <= 0}>Submit Test</Button>
        )}
      </div>
    </div>
  );
}

export default TakeTest;



