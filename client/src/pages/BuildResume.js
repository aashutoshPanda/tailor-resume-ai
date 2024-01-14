// src/components/ResumePreview.js
import React, { useState, useRef } from "react";
import {
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Avatar,
  Typography,
  Grid,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  initialBasicDetails,
  initialEducationDetails,
  initialEducationList,
  initialSelectedLanguages,
  initialAwardList,
  initialAward,
  initialExperience,
  initialExperienceList,
  initialProject,
  initialProjectList,
} from "../constants/resumeBuilder";

const ResumePreview = () => {
  const [basicDetails, setBasicDetails] = useState(initialBasicDetails);
  const [educationDetails, setEducationDetails] = useState(
    initialEducationDetails
  );
  const [educationList, setEducationList] = useState(initialEducationList);
  const [selectedLanguages, setSelectedLanguages] = useState(
    initialSelectedLanguages
  );
  const [selectedTools, setSelectedTools] = useState(["Git", "VS Code"]);
  const [selectedFrameworks, setSelectedFrameworks] = useState(
    initialSelectedLanguages
  );

  const handleBasicDetailsChange = (event) => {
    const { name, value } = event.target;
    setBasicDetails((prevBasicDetails) => ({
      ...prevBasicDetails,
      [name]: value,
    }));
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setEducationDetails((prevEducationDetails) => ({
      ...prevEducationDetails,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    setEducationList((prevEducationList) => [
      ...prevEducationList,
      { ...educationDetails },
    ]);
    setEducationDetails(initialEducationDetails);
  };

  const handleDeleteEducation = (index) => {
    setEducationList((prevEducationList) =>
      prevEducationList.filter((_, i) => i !== index)
    );
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguages(event.target.value);
  };

  const handleToolChange = (event) => {
    setSelectedTools(event.target.value);
  };

  const handleFrameworkChange = (event) => {
    setSelectedFrameworks(event.target.value);
  };

  const [awardDetails, setAwardDetails] = useState(initialAward);
  const [awardList, setAwardList] = useState(initialAwardList);

  const handleAwardChange = (event) => {
    const { name, value } = event.target;
    setAwardDetails((prevAwardDetails) => ({
      ...prevAwardDetails,
      [name]: value,
    }));
  };

  const handleAddAward = () => {
    setAwardList((prevAwardList) => [...prevAwardList, { ...awardDetails }]);
    setAwardDetails({
      name: "",
      year: "",
      shortDescription: "",
    });
  };

  const handleDeleteAward = (index) => {
    setAwardList((prevAwardList) =>
      prevAwardList.filter((_, i) => i !== index)
    );
  };
  const [experienceDetails, setExperienceDetails] = useState(initialExperience);
  const [experienceList, setExperienceList] = useState(initialExperienceList);

  const handleExperienceChange = (event) => {
    const { name, value } = event.target;
    setExperienceDetails((prevExperienceDetails) => ({
      ...prevExperienceDetails,
      [name]: value,
    }));
  };

  const handleAddExperience = () => {
    setExperienceList((prevExperienceList) => [
      ...prevExperienceList,
      { ...experienceDetails },
    ]);
    setExperienceDetails(initialExperience);
  };

  const handleDeleteExperience = (index) => {
    setExperienceList((prevExperienceList) =>
      prevExperienceList.filter((_, i) => i !== index)
    );
  };

  // Project State
  const [projectDetails, setProjectDetails] = useState(initialProject);
  const [projectList, setProjectList] = useState(initialProjectList);

  // Project Handlers
  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      [name]: value,
    }));
  };

  const handleAddProject = () => {
    setProjectList((prevProjectList) => [
      ...prevProjectList,
      { ...projectDetails },
    ]);
    setProjectDetails({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      link: "",
    });
  };

  const handleDeleteProject = (index) => {
    setProjectList((prevProjectList) =>
      prevProjectList.filter((_, i) => i !== index)
    );
  };
  const rightPartRef = useRef(null);
  const handleDownloadPDF = () => {
    const input = rightPartRef.current;

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
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left Part - Input Fields */}
        <Grid item xs={4}>
          <Accordion
            expanded={expandedAccordion === "basic-details"}
            onChange={handleAccordionChange("basic-details")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="basic-details-content"
              id="basic-details-header"
            >
              <Typography>Basic Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Basic Details Input Fields */}
              {Object.entries(basicDetails).map(([field, value]) => (
                <TextField
                  key={field}
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={value}
                  onChange={handleBasicDetailsChange}
                  margin="normal"
                />
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedAccordion === "experience"}
            onChange={handleAccordionChange("experience")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="experience-details-content"
              id="experience-details-header"
            >
              <Typography>Professional Experience</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Experience Input Fields */}
              <TextField
                fullWidth
                label="Organisation"
                name="organisation"
                value={experienceDetails.organisation}
                onChange={handleExperienceChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={experienceDetails.title}
                onChange={handleExperienceChange}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="startDate"
                value={experienceDetails.startDate}
                onChange={handleExperienceChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={experienceDetails.endDate}
                onChange={handleExperienceChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={experienceDetails.description}
                onChange={handleExperienceChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddExperience}
                style={{ marginTop: "16px" }}
              >
                Add Experience
              </Button>

              {/* Experience Box Display */}
              {experienceList.map((experience, index) => (
                <Box
                  key={index}
                  border={1}
                  borderColor="primary.main"
                  borderRadius={2}
                  p={2}
                  mt={2}
                  position="relative"
                >
                  <IconButton
                    onClick={() => handleDeleteExperience(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {experience.organisation}
                  </Typography>
                  <Typography variant="body2">
                    {experience.startDate} to {experience.endDate}
                  </Typography>
                  <Typography variant="body2">
                    {experience.description}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandedAccordion === "education"}
            onChange={handleAccordionChange("education")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="education-details-content"
              id="education-details-header"
            >
              <Typography>Education</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Education Section Input Fields */}
              <TextField
                fullWidth
                label="Name of Institute"
                name="institute"
                value={educationDetails.institute}
                onChange={handleEducationChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={educationDetails.degree}
                onChange={handleEducationChange}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="startDate"
                value={educationDetails.startDate}
                onChange={handleEducationChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={educationDetails.endDate}
                onChange={handleEducationChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Grade"
                name="grade"
                value={educationDetails.grade}
                onChange={handleEducationChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddEducation}
                style={{ marginTop: "16px" }}
              >
                Add Education
              </Button>

              {/* Education Box Display */}
              {educationList.map((education, index) => (
                <Box
                  key={index}
                  border={1}
                  borderColor="primary.main"
                  borderRadius={2}
                  p={2}
                  mt={2}
                  position="relative"
                >
                  <IconButton
                    onClick={() => handleDeleteEducation(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {education.institute}
                  </Typography>
                  <Typography variant="body2">
                    {education.degree} - {education.startDate} to{" "}
                    {education.endDate}
                  </Typography>
                  <Typography variant="body2">
                    Grade: {education.grade}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
          {/* Projects Accordion */}
          <Accordion
            expanded={expandedAccordion === "projects"}
            onChange={handleAccordionChange("projects")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="projects-details-content"
              id="projects-details-header"
            >
              <Typography>Projects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Project Input Fields */}
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={projectDetails.name}
                onChange={handleProjectChange}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="startDate"
                value={projectDetails.startDate}
                onChange={handleProjectChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={projectDetails.endDate}
                onChange={handleProjectChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={projectDetails.description}
                onChange={handleProjectChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Link"
                name="link"
                value={projectDetails.link}
                onChange={handleProjectChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProject}
                style={{ marginTop: "16px" }}
              >
                Add Project
              </Button>

              {/* Project Box Display */}
              {projectList.map((project, index) => (
                <Box
                  key={index}
                  border={1}
                  borderColor="primary.main"
                  borderRadius={2}
                  p={2}
                  mt={2}
                  position="relative"
                >
                  <IconButton
                    onClick={() => handleDeleteProject(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {project.name}
                  </Typography>
                  <Typography variant="body2">
                    {`${project.startDate} to ${project.endDate}`}
                  </Typography>
                  <Typography variant="body2">{project.description}</Typography>
                  <Typography variant="body2">Link: {project.link}</Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Skills Accordion */}
          <Accordion
            expanded={expandedAccordion === "skills"}
            onChange={handleAccordionChange("skills")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="skills-details-content"
              id="skills-details-header"
            >
              <Typography>Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Programming Languages Multi-Select */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="languages-label">
                  Programming Languages
                </InputLabel>
                <Select
                  labelId="languages-label"
                  id="languages"
                  multiple
                  value={selectedLanguages}
                  onChange={handleLanguageChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {["JavaScript", "Python", "Java", "C++", "Ruby"].map(
                    (language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {/* Tools Multi-Select */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="tools-label">Tools</InputLabel>
                <Select
                  labelId="tools-label"
                  id="tools"
                  multiple
                  value={selectedTools}
                  onChange={handleToolChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {["Git", "VS Code", "Docker", "JIRA", "Postman"].map(
                    (tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {/* Frameworks Multi-Select */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="frameworks-label">Frameworks</InputLabel>
                <Select
                  labelId="frameworks-label"
                  id="frameworks"
                  multiple
                  value={selectedFrameworks}
                  onChange={handleFrameworkChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {[
                    "React",
                    "Node.js",
                    "Angular",
                    "Spring Boot",
                    "Express.js",
                  ].map((framework) => (
                    <MenuItem key={framework} value={framework}>
                      {framework}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Awards Accordion */}
          <Accordion
            expanded={expandedAccordion === "awards"}
            onChange={handleAccordionChange("awards")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="awards-details-content"
              id="awards-details-header"
            >
              <Typography>Awards</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Awards Input Fields */}
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={awardDetails.name}
                onChange={handleAwardChange}
                margin="normal"
              />
              <TextField
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="Year"
                name="year"
                value={awardDetails.year}
                onChange={handleAwardChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Short Description"
                name="shortDescription"
                value={awardDetails.shortDescription}
                onChange={handleAwardChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAward}
                style={{ marginTop: "16px" }}
              >
                Add Award
              </Button>

              {/* Awards Box Display */}
              {awardList.map((award, index) => (
                <Box
                  key={index}
                  border={1}
                  borderColor="primary.main"
                  borderRadius={2}
                  p={2}
                  mt={2}
                  position="relative"
                >
                  <IconButton
                    onClick={() => handleDeleteAward(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {award.name}
                  </Typography>
                  <Typography variant="body2">
                    Year: {award.year}, Short Description:{" "}
                    {award.shortDescription}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
          {/* Button to download the right part as PDF */}
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadPDF}
              style={{ marginTop: "16px" }}
            >
              Download
            </Button>
          </Grid>
        </Grid>

        {/* Right Part - Resume Preview */}
        <Grid item xs={8} ref={rightPartRef}>
          {/* First Row */}
          <Grid container spacing={3} style={{ marginTop: "16px" }}>
            {/* First Column */}
            <Grid item xs={10}>
              <Box textAlign="left">
                <Typography variant="h5">{basicDetails.name}</Typography>
                <Typography variant="subtitle1" color="primary">
                  {basicDetails.currentJobTitle}
                </Typography>
                <Typography variant="body1">
                  {`${basicDetails.email} | ${basicDetails.website} | ${basicDetails.phoneNumber} | ${basicDetails.location}`}
                </Typography>
              </Box>
            </Grid>

            {/* Second Column */}
            <Grid item xs={2} container justifyContent="flex-end">
              <Box textAlign="right">
                <Avatar
                  alt={basicDetails.name}
                  src={basicDetails.profilePicture}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Second Row */}
          <Grid container spacing={3}>
            {/* First Column */}
            <Grid item xs={6}>
              <Box textAlign="left">
                <Typography variant="h6">Professional Experience</Typography>
                <Divider style={{ backgroundColor: "#f0f0f0" }} />
                {experienceList.map((experience, index) => (
                  <Box key={index} mt={2}>
                    {/* First Row - Company Name */}
                    <Typography variant="subtitle1" fontWeight="bold">
                      {experience.organisation}
                    </Typography>
                    {/* Second Row - Job Title and Dates */}
                    <Grid container spacing={3}>
                      {/* First Column - Job Title */}
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" color="primary">
                          {experience.title}
                        </Typography>
                      </Grid>
                      {/* Second Column - Dates (Right Aligned) */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "right" }}
                        >
                          {`${experience.startDate} - ${experience.endDate}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Third Row - Description */}
                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {experience.description}
                    </Typography>
                  </Box>
                ))}

                {/* Awards Section */}
                <Typography variant="h6" style={{ marginTop: "16px" }}>
                  Awards
                </Typography>

                <Divider style={{ backgroundColor: "#f0f0f0" }} />
                {awardList.map((award, index) => (
                  <Box key={index} mt={2}>
                    {/* First Row - Award Name and Year (Right Aligned) */}
                    <Grid container spacing={3}>
                      {/* First Column - Award Name in Bold */}
                      <Grid item xs={10}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {award.name}
                        </Typography>
                      </Grid>
                      {/* Second Column - Year (Right Aligned) */}
                      <Grid item xs={2}>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "right" }}
                        >
                          {award.year}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Second Row - Short Description */}
                    <Typography variant="body2">
                      {award.shortDescription}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Second Column */}
            <Grid item xs={6}>
              <Box textAlign="left">
                <Typography variant="h6">Skills</Typography>

                <Divider style={{ backgroundColor: "#f0f0f0" }} />
                <Typography variant="subtitle1">
                  Programming Languages
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedLanguages.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>

                <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
                  Tools
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedTools.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>

                <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
                  Frameworks
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedFrameworks.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              </Box>
              {/* Projects Section */}
              {/* Projects Section */}
              <Box textAlign="left" style={{ marginTop: "16px" }}>
                <Typography variant="h6">Projects</Typography>
                <Divider style={{ backgroundColor: "#f0f0f0" }} />
                {projectList.map((project, index) => (
                  <Box key={index} mt={2}>
                    {/* First Row - Project Name, Start Date, and End Date */}
                    <Grid
                      container
                      spacing={3}
                      style={{ alignItems: "center" }}
                    >
                      {/* First Column - Project Name */}
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold" }}
                        >
                          {project.name}
                        </Typography>
                      </Grid>
                      {/* Second Column - Dates (Right Aligned) */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "right" }}
                        >
                          {`${project.startDate.slice(
                            5,
                            7
                          )}/${project.startDate.slice(
                            2,
                            4
                          )} - ${project.endDate.slice(
                            5,
                            7
                          )}/${project.endDate.slice(2, 4)}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Second Row - Description */}
                    <Typography variant="body2">
                      {project.description}
                    </Typography>
                    {/* Third Row - Link */}
                    <Typography variant="body2">
                      Link: {project.link}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box textAlign="left" style={{ marginTop: "16px" }}>
                <Typography variant="h6">Education</Typography>

                <Divider style={{ backgroundColor: "#f0f0f0" }} />
                {educationList.map((education, index) => (
                  <Box key={index} mt={2}>
                    {/* First Row - College Name in Bold */}
                    <Typography variant="subtitle1" fontWeight="bold">
                      {education.institute}
                    </Typography>
                    {/* Second Row - Degree, Start Date, End Date (Right Aligned) */}
                    <Grid container spacing={3}>
                      {/* First Column - Degree */}
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {education.degree}
                        </Typography>
                      </Grid>
                      {/* Second Column - Dates (Right Aligned) */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "right" }}
                        >
                          {`${education.startDate} - ${education.endDate}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Third Row - Grade */}
                    <Typography variant="body2">
                      Grade: {education.grade}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumePreview;