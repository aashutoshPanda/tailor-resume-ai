// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import JobDetail from "./pages/ResumeDetail";
import ResumeDetail from "./pages/JobDetail";
import { Typography, Box } from "@mui/material";
import logo from "./assets/logo.svg";

function App() {
  return (
    <Router>
      <Box mt={4} mb={4} textAlign="center">
        {/* Logo and Title */}
        <Typography variant="h4" gutterBottom>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "40px", marginRight: "10px" }}
          />
          TailorMyResume
        </Typography>
      </Box>
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
