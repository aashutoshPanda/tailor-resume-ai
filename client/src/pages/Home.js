// src/components/HomeScreen.js
import React from "react";
import {
  Container,
  Paper,
  Tab,
  Tabs,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import ResumeCardList from "../components/ResumeCardList";
import JobsScreen from "../components/jobTab";
import AddIcon from "@mui/icons-material/Add";

const HomeScreen = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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

        {/* Floating Action Button */}
        <Box position="fixed" bottom={theme.spacing(2)} left={theme.spacing(2)}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            New Resume
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeScreen;
