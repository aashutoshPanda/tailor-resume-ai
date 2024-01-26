// src/components/ResumeCard.js
import React from "react";
import { Box, Button, Grid, Container } from "@mui/material";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { localStorageKeyAPIToken } from "../constants/api";
import Iconify from "./iconify";
import { alpha, useTheme } from "@mui/material/styles";
const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isTokenPresent = localStorage.getItem(localStorageKeyAPIToken); // Replace "yourToken" with the actual token key

  // Access the pathname property of the URLSearchParams object to get the current path
  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyAPIToken);
    navigate("/");
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center" justifyContent="center" pt={6}>
        {/* Logo and Title */}
        <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
          {isTokenPresent && (
            <Iconify
              icon="eva:arrow-back-fill"
              width={40}
              sx={{ color: alpha(theme.palette.primary.main, 1) }}
              onClick={handleBack}
            />
          )}
          <Box
            component="div"
            sx={{
              width: 450,
              height: 60,
              display: "inline-flex",
              overflow: "hidden",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ minWidth: 500, minHeight: 250, position: "relative", top: -95, left: 20 }}
            />
          </Box>
        </Grid>

        {/* Conditional Rendering of Logout Button */}
        {isTokenPresent && (
          <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Header;
