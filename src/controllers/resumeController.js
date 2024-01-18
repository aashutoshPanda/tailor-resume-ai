// controllers/resumeController.js
import Resume from "../models/resumeModel.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const newResume = await Resume.create(req.body);
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all resumes
export const getAllResumes = async (req, res) => {
  try {
    const allResumes = await Resume.find();
    res.status(200).json(allResumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a resume by ID
export const updateResumeById = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a resume by ID
export const deleteResumeById = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
