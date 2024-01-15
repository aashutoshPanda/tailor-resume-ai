// src/components/ResumePreview.js
import React from "react";
import { Container, Grid } from "@mui/material";

import ResumeAccordion from "../components/ResumeAccordion";
import ResumePreview from "../components/ResumePreview";

const ResumeBuilder = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <ResumeAccordion />
        <ResumePreview />
      </Grid>
    </Container>
  );
};

export default ResumeBuilder;
