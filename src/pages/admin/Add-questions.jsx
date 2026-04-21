import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Add-question.css";
import Button from "../../components/Button.jsx";

function AddQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load the test
useEffect(() => {
  const tests = JSON.parse(localStorage.getItem("tests")) || [];
  const foundTest = tests.find((t) => t.id === Number(id));

  setTest(foundTest);
  setAddedQuestions(foundTest?.questions || []);
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
    id: Date.now()+ Math.random(), // unique ID for each question 
    question: questionText,
    options :options,
    correctAnswer: correctAnswer
  };

  const tests = JSON.parse(localStorage.getItem("tests")) || [];

  const updatedTests = tests.map((t) => {
      if (t.id === Number(id)) {
          let updatedQuestions = t.questions || [];

          if (editingIndex !== null) {
            // Edit existing question
            updatedQuestions = updatedQuestions.map((q, i) =>
              i === editingIndex ? newQuestion : q
            );
          } else {
            // add
            updatedQuestions = [...updatedQuestions, newQuestion];
          }

          setAddedQuestions(updatedQuestions);

          return {
            ...t,
            questions: updatedQuestions
          };
      }
        return t;
    });

      localStorage.setItem("tests", JSON.stringify(updatedTests));

      // Reset form
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(null);
      setEditingIndex(null);
  };


const handleDeleteQuestion = (index) => {
  const tests = JSON.parse(localStorage.getItem("tests")) || [];

  const updatedTests = tests.map((t) => {
    if (t.id === Number(id)) {
      const updatedQuestions = t.questions.filter((_, i) => i !== index);
      setAddedQuestions(updatedQuestions);

      return {
        ...t,
        questions: updatedQuestions
      };
    }
    return t;
  });

  localStorage.setItem("tests", JSON.stringify(updatedTests));
};
const handleEditQuestion = (question, index) => {
  setQuestionText(question.question);
  setOptions(question.options);
  setCorrectAnswer(question.correctAnswer);
  setEditingIndex(index);
};

  return (
    <>
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
      <div className="preview-questions">
        <hr style={{ margin: "30px 0" }} />

        <h3>Added Questions</h3>

        {addedQuestions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          addedQuestions.map((q, index) => (
            <div key={index} className="question-preview">
              <p>
                <strong>Q{index + 1}:</strong> {q.question}
              </p>

              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>
                    {opt} {q.correctAnswer === i && "✔"}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleEditQuestion(q, index)}>
                  Edit
                </button>

                <button
                  style={{ background: "#dc2626", marginLeft: "10px" }}
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))

        )}
        <button 
          
          onClick={() => 
            handleAddQuestion &&
            navigate("/admin")
          }
        >
          Done
        </button>
      </div>
    </>

  );
}

export default AddQuestions;