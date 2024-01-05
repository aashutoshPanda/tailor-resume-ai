// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import JobDetail from "./pages/ResumeDetail";
import ResumeDetail from "./pages/JobDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/resume" element={<ResumeDetail />} />
        <Route path="/job" element={<JobDetail />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
