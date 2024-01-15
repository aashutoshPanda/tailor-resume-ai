// src/components/ResumePreview.js
import React, { useRef, useState } from "react";
import {
  TextField,
  Container,
  Grid,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ResumeAccordion from "../components/ResumeAccordion";
import ResumePreview from "../components/ResumePreview";
import {
  FloatingDownloadButton,
  FloatingSaveButton,
} from "../components/FloatingDownloadButton";
import MenuIcon from "@mui/icons-material/Menu";

const ResumeBuilder = () => {
  const ref = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDownload = () => {
    const input = ref.current;

    // Use html2canvas to capture the content as an image
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      console.log({ imgData });

      // Use jsPDF to create a PDF document
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);

      // Save the PDF with a specific name (e.g., "resume.pdf")
      pdf.save("tailor-my-resume");
    });
  };

  const handleSave = () => {
    console.log("saved");
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [resumeName, setResumeName] = useState("MyResume");
  const handleResumeNameChange = (e) => {
    setResumeName(e.target.value);
  };
  const resumeNameInput = (
    <TextField
      label="Resume"
      name="resumeName"
      fullWidth
      size="small"
      value={resumeName}
      onChange={handleResumeNameChange}
      margin="normal"
    />
  );
  return (
    <Container style={{ position: "relative" }}>
      {!isMobile ? resumeNameInput : null}
      <Grid container spacing={3}>
        {isMobile ? (
          <>
            <Grid paddingLeft={3} container alignItems="center">
              <MenuIcon fontSize="medium" onClick={toggleDrawer} />
              {resumeNameInput}
            </Grid>
            <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
              <ResumeAccordion />

              <Grid padding={3} container justifyContent="flex-end">
                <ArrowBackIcon fontSize="medium" onClick={toggleDrawer} />
              </Grid>
            </Drawer>

            <ResumePreview ref={ref} />
          </>
        ) : (
          <>
            <ResumeAccordion />
            <ResumePreview ref={ref} />
          </>
        )}
      </Grid>

      <FloatingSaveButton handleClick={handleSave} />
      <FloatingDownloadButton handleClick={handleDownload} />
    </Container>
  );
};

export default ResumeBuilder;
