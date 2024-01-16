// models/jobModel.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  organisation: String,
  designation: String,
  lastModified: Date,
  lastDate: Date,
  jobLink: String,
  status: String,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
