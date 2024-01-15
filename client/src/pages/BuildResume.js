// src/components/ResumePreview.js
import React, { useRef } from "react";
import { Container, Grid, Button, Fab } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ResumeAccordion from "../components/ResumeAccordion";
import ResumePreview from "../components/ResumePreview";
import { Download } from "@mui/icons-material";

const ResumeBuilder = () => {
  const ref = useRef(null);
  const handleDownloadPDF = () => {
    const input = ref.current;

    // Use html2canvas to capture the content as an image
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Use jsPDF to create a PDF document
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);

      // Save the PDF with a specific name (e.g., "resume.pdf")
      pdf.save("resume.pdf");
    });
  };

  return (
    <Container style={{ position: "relative" }}>
      <Grid container spacing={3}>
        <ResumeAccordion />
        <ResumePreview ref={ref} />
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 1000, // Adjust the z-index as needed
        }}
      >
        <Download onClick={handleDownloadPDF} />
      </Fab>
    </Container>
  );
};

export default ResumeBuilder;
