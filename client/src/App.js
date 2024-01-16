// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import BuildResume from "./pages/BuildResume";
import Landing from "./pages/Landing";
import { Typography, Box } from "@mui/material";
import logo from "./assets/logo.png";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Box mt={4} mb={4} textAlign="center" display="flex" alignItems="center" justifyContent="center">
          {/* Logo and Title */}
          <img src={logo} alt="Logo" style={{ width: "55px", marginRight: "10px", marginBottom: "10px" }} />
          <Typography variant="h5">TAILOR MY RESUME</Typography>
        </Box>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/resume" element={<BuildResume />} />
          <Route path="/job" element={<JobDetail />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
