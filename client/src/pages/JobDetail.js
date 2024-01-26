// src/components/JobOpeningPage.js
import { useDispatch, useSelector } from "react-redux";
import { addJob, fetchJobById, updateLocalJob, deleteJob, updateJob } from "../reducers/jobSlice";
import React, { useEffect } from "react";
import { Container, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const JobOpeningPage = () => {
  const { id: jobId } = useParams();
  const isCreateMode = jobId === "new";
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // If the job is being created, dispatch the addJob action
      // Otherwise, dispatch the updateJob action
      if (isCreateMode) {
        dispatch(addJob(job)); // Implement addJob logic in your jobSlice
      } else {
        dispatch(updateJob(job));
      }
      navigate("/home/job");
      // If the dispatch is successful, navigate to the "/home" route
    } catch (error) {
      // If the dispatch fails, handle the error appropriately
      console.error("Failed to save job:", error);
    }
  };
  let job = useSelector((state) => state.jobs.selectedJob);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch jobs when the component mounts using the jobId from the URL
    dispatch(fetchJobById(jobId));
  }, [jobId, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      updateLocalJob({
        ...job,
        [name]: value,
      })
    );
  };

  const handleDelete = () => {
    // Implement your delete logic here
    dispatch(deleteJob(job._id));
  };

  const isLinkValid = () => {
    // Implement your URL validation logic here
    // Example: Simple check for "https://" prefix
    return job.jobLink.startsWith("https://");
  };

  // possibly the case when invalid job id is provided in the url
  if (!job._id && !isCreateMode) return null;

  return (
    <Container maxWidth="lg">
      <Box>
        {/* ... (previous form fields) */}
        <TextField
          fullWidth
          label="Organisation"
          name="organisation"
          value={job.organisation}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Designation"
          name="designation"
          value={job.designation}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Job Link"
          name="jobLink"
          value={job.jobLink}
          onChange={handleChange}
          error={!isLinkValid()}
          helperText={!isLinkValid() && "Invalid URL"}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select labelId="status-label" id="status" name="status" value={job.status} onChange={handleChange}>
            <MenuItem value="APPLIED">APPLIED</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
          </Select>
        </FormControl>

        {job.status === "APPLIED" && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="referral-label">Referral Status</InputLabel>
            <Select
              labelId="referral-label"
              id="referralStatus"
              name="referralStatus"
              value={job.referralStatus}
              onChange={handleChange}
            >
              <MenuItem value="NOT_TAKEN">Not Taken</MenuItem>
              <MenuItem value="TAKEN">Taken</MenuItem>
            </Select>
          </FormControl>
        )}

        {job.status === "APPLIED" && job.referralStatus === "TAKEN" && (
          <TextField
            fullWidth
            label="Referral Name"
            name="referralName"
            value={job.referralName}
            onChange={handleChange}
            margin="normal"
          />
        )}

        <TextField
          multiline
          minRows={3}
          maxRows={10}
          placeholder="Description"
          style={{
            width: "100%",
            marginTop: "16px",
            border: "0px",
          }}
          name="description"
          value={job.description}
          onChange={handleChange}
        />

        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          {!isCreateMode ? (
            <Button variant="contained" color="inherit" onClick={handleDelete} style={{ marginLeft: "8px" }}>
              Delete
            </Button>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default JobOpeningPage;
