import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./TakeTest.css";
import { useRef } from "react";
import StudentProfile from "../components/StudentProfile";




function TakeTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---------------- TEST STATE ----------------
  const [test, setTest] = useState(null);

  useEffect(() => {
    const storedTests = JSON.parse(localStorage.getItem("tests")) || [];

    const foundTest = storedTests.find(
      (t) => String(t.id) === String(id)
    );

    setTest(foundTest);
  }, [id]);

  const questions = test?.questions || [];

  // ---------------- QUESTION STATE ----------------
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(`test-${id}-answers`);

    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  // ---------------- TIMER STATE ----------------
  const [timeLeft, setTimeLeft] = useState(null);

  const hasSubmitted = useRef(false);

  // Initialize timer ONLY after test loads
  useEffect(() => {
    if (!test) return;

    const duration = Number(test.duration);

    if (isNaN(duration) || duration <= 0) {
      console.error("Invalid test duration:", test.duration);
      return;
    }

    setTimeLeft(duration * 60);
  }, [test]);

  // ---------------- SAVE PARTIAL ANSWERS ----------------
  useEffect(() => {
    localStorage.setItem(
      `test-${id}-answers`,
      JSON.stringify(selectedAnswers)
    );
  }, [selectedAnswers, id]);

  // ---------------- TIMER COUNTDOWN ----------------
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // ---------------- SUBMIT FUNCTION ----------------
  const handleSubmit = (auto = false) => {
    if (hasSubmitted.current) return;

    hasSubmitted.current = true;

    let score = 0;

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];

      // correctAnswer stores the correct option index
      if (selected === q.correctAnswer) {
        score++;
      }
    });

    // ---------------- UPDATE TEST STATUS ----------------
    const storedTests = JSON.parse(localStorage.getItem("tests")) || [];

    const updatedTests = storedTests.map((t) => {
      if (String(t.id) === String(id)) {
        return {
          ...t,
          status: "Completed",
        };
      }

      return t;
    });

    localStorage.setItem("tests", JSON.stringify(updatedTests));

    // ---------------- SAVE RESULT ----------------
    const studentName =
      localStorage.getItem("studentName")?.trim() || "Anonymous";

    const result = {
      studentName,
      score,
      total: questions.length,
      percentage:
        questions.length > 0
          ? ((score / questions.length) * 100).toFixed(1)
          : 0,
      status:
        score >= questions.length * 0.5
          ? "Passed"
          : "Failed",
    };

    // Admin results
    const resultKey = `test-${id}-results`;

    const existingResults =
      JSON.parse(localStorage.getItem(resultKey)) || [];

    existingResults.push(result);

    localStorage.setItem(
      resultKey,
      JSON.stringify(existingResults)
    );

    // Student personal result
    localStorage.setItem(
      `test-${id}-myResult`,
      JSON.stringify({
        score,
        total: questions.length,
      })
    );

    // Clear saved answers
    localStorage.removeItem(`test-${id}-answers`);

    alert(
      auto
        ? "Time is up! Test submitted automatically."
        : "Test submitted successfully!"
    );

    navigate(`/results/${id}`, {
      state: {
        score,
        total: questions.length,
      },
    });
  };

  // ---------------- AUTO SUBMIT ----------------
  useEffect(() => {
    if (
      timeLeft === 0 &&
      test &&
      !hasSubmitted.current
    ) {
      handleSubmit(true);
    }
  }, [timeLeft, test]);

  // ---------------- LOADING STATES ----------------
  if (!test) {
    return <p>Loading test...</p>;
  }

  if (!questions.length) {
    return <p>No questions added to this test yet.</p>;
  }

  // ---------------- CURRENT QUESTION ----------------
  const currentQuestion = questions[currentQuestionIndex];

  // ---------------- ANSWER SELECTION ----------------
  const handleOptionSelect = (index) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  };

  // ---------------- NAVIGATION ----------------
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // ---------------- TIME DISPLAY ----------------
  const minutes = Math.floor((timeLeft || 0) / 60);

  const seconds = (timeLeft || 0) % 60;

  return (
    <>
      <StudentProfile />
      <div className="take-test-container">
        <h2>{test.title}</h2>

        <p>
          <strong>Duration:</strong> {test.duration} minutes
        </p>

        <p
          style={{
            color: timeLeft <= 60 ? "red" : "inherit",
            fontWeight: "bold",
          }}
        >
          Time Left: {minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>

        {/* QUESTION CARD */}
        <div className="question-card">
          <h3 className="question-text">
            Question {currentQuestionIndex + 1} of{" "}
            {questions.length}
          </h3>

          <p className="question-text">
            {currentQuestion.question}
          </p>

          <div className="options">
            {currentQuestion.options.map(
              (option, index) => (
                <Button
                  key={index}
                  type={
                    selectedAnswers[currentQuestion.id] ===
                    index
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    handleOptionSelect(index)
                  }
                  disabled={timeLeft <= 0}
                >
                  {option}
                </Button>
              )
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="navigation-buttons">
          {currentQuestionIndex > 0 && (
            <Button
              onClick={handlePrevious}
              disabled={timeLeft <= 0}
            >
              Previous
            </Button>
          )}

          {currentQuestionIndex <
          questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={timeLeft <= 0}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => handleSubmit()}
              disabled={timeLeft <= 0}
            >
              Submit Test
            </Button>
          )}
        </div>
      </div>
    </>  
  );
}


export default TakeTest;



