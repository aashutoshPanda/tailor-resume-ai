// src/components/ResumeCard.js
import React from "react";
import { Typography, Box, Button, Grid, Container } from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { localStorageKeyAPIToken } from "../constants/api";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyAPIToken);
    navigate("/");
  };

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        {/* Logo and Title */}
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" style={{ width: "55px", marginRight: "10px", marginBottom: "10px" }} />
            <Typography variant="h5">TAILOR MY RESUME</Typography>
          </Box>
        </Grid>

        {/* Logout Button */}
        <Grid item xs={6} container justifyContent="flex-end">
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
