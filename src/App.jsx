import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mockTests } from './data/Test.js';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";
import Results from "./pages/Results";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateTest from "./pages/admin/CreateTest";

function App() {
  const [count, setCount] = useState(0)
  const [tests, setTests] = useState(mockTests);

  const addTest = (newTest) => {
    setTests(prev => [...prev, newTest]);
  };

  const deleteTest = (id) => {
    setTests(prev => prev.filter(test => test.id !== id));
  };
  const editTest = (updatedTest) => {
    setTests(prev => prev.map(test =>
      test.id === updatedTest.id ? updatedTest : test
    ));
  };

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test/:id" element={<TakeTest />} />
        <Route path="/results/:id" element={<Results />} />
        
        <Route
          path="/admin"
          element={<AdminDashboard tests={tests} deleteTest={deleteTest}  />}
        />

        <Route
          path="/admin/create-test"
          element={<CreateTest addTest={addTest} editTest={editTest}  />}
        />
      </Routes>
    </BrowserRouter>

    
    </>

  );
}

export default App;

