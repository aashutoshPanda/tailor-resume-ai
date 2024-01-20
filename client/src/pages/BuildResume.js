import React, { useRef, useEffect } from "react";
import { TextField, Container, Grid, useMediaQuery, Drawer } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ResumeAccordion from "../components/ResumeAccordion";
import ResumePreview from "../components/ResumePreview";
import { FloatingDownloadButton, FloatingSaveButton } from "../components/FloatingDownloadButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addResume, fetchResumeById, updateResume, updateResumeName } from "../reducers/resumeBuilderSlice";

const ResumeBuilder = () => {
  const { id: resumeId } = useParams();
  const isCreateMode = resumeId === "new";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedResume = useSelector((state) => state.resumeBuilder.selectedResume);
  const ref = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDownload = () => {
    const input = ref.current;

    // Use html2canvas to capture the content as an image
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Use jsPDF to create a PDF document
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);

      // Save the PDF with a specific name (e.g., "resume.pdf")
      pdf.save("tailor-my-resume");
    });
  };

  useEffect(() => {
    // Fetch jobs when the component mounts using the jobId from the URL
    dispatch(fetchResumeById(resumeId));
  }, [resumeId, dispatch]);

  const handleSave = async () => {
    try {
      // If the job is being created, dispatch the addJob action
      // Otherwise, dispatch the updateJob action
      if (isCreateMode) {
        dispatch(addResume(selectedResume)); // Implement addJob logic in your jobSlice
      } else {
        dispatch(updateResume(selectedResume));
      }
      // If the dispatch is successful, navigate to the "/home" route
      navigate("/home/resume");
    } catch (error) {
      // If the dispatch fails, handle the error appropriately
      console.error("Failed to save resume:", error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const resumeName = useSelector((state) => state.resumeBuilder.selectedResume.name);
  const handleResumeNameChange = (e) => {
    dispatch(updateResumeName(e.target.value));
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

  // case when invalid id is present in the url
  if (!selectedResume._id && !isCreateMode) return "No such resume found";
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
