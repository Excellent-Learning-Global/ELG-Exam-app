import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Add-question.css";

function AddQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Load the test
  useEffect(() => {
    const tests = JSON.parse(localStorage.getItem("tests")) || [];
    const foundTest = tests.find((t) => t.id === Number(id));
    setTest(foundTest);
  }, [id]);

  if (!test) return <h2>Loading...</h2>;

  const handleOptionChange = (value, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (!questionText || options.includes("") || correctAnswer === null) {
      alert("All fields are required!");
      return;
    }

    const newQuestion = {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer
    };

    const tests = JSON.parse(localStorage.getItem("tests")) || [];

    const updatedTests = tests.map((t) => {
      if (t.id === Number(id)) {
        return {
          ...t,
          questions: t.questions ? [...t.questions, newQuestion] : [newQuestion]
        };
      }
      return t;
    });

    localStorage.setItem("tests", JSON.stringify(updatedTests));
    
    

    alert("Question Added Successfully!");
    

    // Reset form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
  };

  return (
    <div className="add-questions-container">
      <h2>Add Questions to: {test.title}</h2>

      <textarea
        placeholder="Enter Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {options.map((option, index) => (
        <div key={index} className="option-group">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(e.target.value, index)}
          />

          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswer === index}
            onChange={() => setCorrectAnswer(index)}
          />
          <span>Correct</span>
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>

      <button
        
        onClick={() => 
          handleAddQuestion &&
          navigate("/admin")
        }
      >
        Done
      </button>
    </div>
  );
}

export default AddQuestions;