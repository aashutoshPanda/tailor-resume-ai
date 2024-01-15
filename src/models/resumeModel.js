// models/resumeModel.js
import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  institute: String,
  degree: String,
  startDate: String,
  endDate: String,
  grade: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  description: String,
  link: String,
});

const awardSchema = new mongoose.Schema({
  name: String,
  year: String,
  shortDescription: String,
});

const resumeSchema = new mongoose.Schema({
  id: String,
  name: String,
  basicDetails: {
    name: String,
    profilePicture: String,
    currentJobTitle: String,
    email: String,
    website: String,
    phoneNumber: String,
    location: String,
    yearsOfExperience: String,
    totalExperience: String,
  },
  education: [educationSchema],
  languages: [String],
  tools: [String],
  frameworks: [String],
  projects: [projectSchema],
  awards: [awardSchema],
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
