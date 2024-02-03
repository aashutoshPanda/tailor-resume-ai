// models/JobModel.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  organisation: String,
  designation: String,
  lastModified: Date,
  lastDate: Date,
  jobLink: String,
  status: String,
  resume: String, // Added resume field
  description: String, // Added description field
  referralStatus: String, // Added referralStatus field
  referralName: String, // Added referralName field
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
