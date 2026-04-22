import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { mockTests } from "./data/Test.js";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";
import Results from "./pages/Results";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateTest from "./pages/admin/CreateTest";
import AdminResults from "./pages/admin/AdminResult.jsx";
import AddQuestions from "./pages/admin/Add-questions.jsx";

function App() {
  const [tests, setTests] = useState(() => {
    const stored = localStorage.getItem("tests");
    return stored ? JSON.parse(stored) : [];
  });
  const addTest = (newTest) => {
    const updated = [...tests, newTest];
    setTests(updated);
    localStorage.setItem("tests", JSON.stringify(updated));
  };
  const deleteTest = (id) => {
    const updated = tests.filter(t => t.id !== id);
    setTests(updated);
    localStorage.setItem("tests", JSON.stringify(updated));
  };
  const editTest = (updatedTest) => {
    const updated = tests.map(t =>
      t.id === updatedTest.id ? updatedTest : t
    );
    setTests(updated);
    localStorage.setItem("tests", JSON.stringify(updated));
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/test/:id" element={<TakeTest tests={tests} />} />
        <Route path="/results/:id" element={<Results tests={tests} />} />

        
        <Route
          path="/admin"
          element={<AdminDashboard tests={tests} deleteTest={deleteTest} />}
        />
        <Route
          path="/admin/create-test"
          element={<CreateTest addTest={addTest} editTest={editTest} />}
        />
        <Route
          path="/admin/results"
          element={<AdminResults />}
        />
        <Route path="/admin/add-questions/:id" element={<AddQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


