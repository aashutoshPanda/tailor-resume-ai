// jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialJobOpening } from "../constants/jobs";

const API_BASE_URL = "http://localhost:3030/jobs"; // Replace with your actual API endpoint

// Async Thunks
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

export const fetchJobById = createAsyncThunk("jobs/fetchJobById", async (id) => {
  if (id === "new") return { ...initialJobOpening };
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
});

export const updateLocalJob = createAsyncThunk("jobs/updateLocalJob", (job) => {
  return job;
});

export const updateJob = createAsyncThunk("jobs/updateJob", async (job) => {
  const response = await axios.patch(`${API_BASE_URL}/${job._id}`, job);
  return response.data;
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return id;
});

export const addJob = createAsyncThunk("jobs/addJob", async (job) => {
  const response = await axios.post(API_BASE_URL, job);
  return response.data;
});

// Slice
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    selectedJob: initialJobOpening,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
      })
      .addCase(updateLocalJob.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
        // Update the job in the local state without making a request
        const updatedJob = action.payload;
        const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
        if (index !== -1) {
          state.jobs[index] = updatedJob;
        }
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
        // Update the job in the local state after making a patch request
        const updatedJob = action.payload;
        const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
        if (index !== -1) {
          state.jobs[index] = updatedJob;
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        // Remove the job from the local state after making a delete request
        const deletedJobId = action.payload;
        state.jobs = state.jobs.filter((job) => job._id !== deletedJobId);
      })
      .addCase(addJob.fulfilled, (state, action) => {
        // Add the new job to the local state after making a post request
        state.jobs.push(action.payload);
      });
  },
});

export const { updateSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
