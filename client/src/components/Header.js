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
      <Grid container justifyContent="space-between" alignItems="center" flexWrap="nowrap" mt={-8}>
        <Grid item>
          {isTokenPresent && (
            <Iconify
              icon="eva:arrow-back-fill"
              width={40}
              sx={{ color: alpha(theme.palette.primary.main, 1) }}
              onClick={handleBack}
            />
          )}
        </Grid>

        <Grid item>
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              clipPath: "rect(5px 5px 160px 145px round 20%)",
            }}
            alt="logo"
            src={logo}
          />
        </Grid>

        <Grid item>
          {isTokenPresent && (
            <Button variant="contained" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
