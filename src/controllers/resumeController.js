// controllers/resumeController.js
import Resume from "../models/resumeModel.js";
import User from "../models/UserModel.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const newResume = await Resume.create(req.body);
    // Update the current user with the new resume
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { resumeIds: newResume._id } },
      { new: true }
    );
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all resumes
export const getAllResumes = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the current user
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve resumes based on resumeIds
    const resumeIds = currentUser.resumeIds;
    const userResumes = await Resume.find({ _id: { $in: resumeIds } });

    res.status(200).json(userResumes);
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
    // Find and delete the resume
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);

    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    // Assuming req.user._id contains the current user's ID
    const userId = req.user._id;

    // Update the current user to remove the deleted resume ID
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { resumeIds: req.params.id } }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
