import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";
import Results from "./pages/Results";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateTest from "./pages/admin/CreateTest";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test/:id" element={<TakeTest />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-test" element={<CreateTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

