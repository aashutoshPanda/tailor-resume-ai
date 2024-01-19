// src/components/HomeScreen.js
import React from "react";
import { Container, Paper, Tab, Tabs, Fab, Box } from "@mui/material";
import ResumeCardList from "../components/ResumeCardList";
import JobsScreen from "../components/JobTab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [tabValue, setTabValue] = React.useState(1);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddClick = () => {
    const urlToNavigate = tabValue === 0 ? "/resume" : "/job/new";
    navigate(urlToNavigate);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4} textAlign="center">
        {/* Tab Layout */}
        <Paper square>
          <Tabs value={tabValue} onChange={handleChange} centered>
            <Tab label="Resumes" />
            <Tab label="Jobs" />
          </Tabs>
        </Paper>

        {/* Content based on selected tab */}
        {tabValue === 0 && <ResumeCardList />}
        {tabValue === 1 && <JobsScreen />}
      </Box>
      {/* Floating Action Button */}
      <Box style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={handleAddClick} />
        </Fab>
      </Box>
    </Container>
  );
};

export default HomeScreen;
