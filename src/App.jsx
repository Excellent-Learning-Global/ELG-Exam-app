import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { mockTests } from "./data/Test.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";
import Results from "./pages/Results";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateTest from "./pages/admin/CreateTest";
import AdminResults from "./pages/admin/AdminResult.jsx";

function App() {
  const [tests, setTests] = useState(mockTests);

  const addTest = (newTest) => setTests(prev => [...prev, newTest]);
  const deleteTest = (id) => setTests(prev => prev.filter(t => t.id !== id));
  const editTest = (updatedTest) => setTests(prev =>
    prev.map(t => t.id === updatedTest.id ? updatedTest : t)
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        
        <Route path="/dashboard" element={<Dashboard tests={tests} />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;


