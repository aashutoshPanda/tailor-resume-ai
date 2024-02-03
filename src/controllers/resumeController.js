// controllers/resumeController.js
import Resume from "../models/resumeModel.js";
import User from "../models/UserModel.js";
import { deleteResumeThumbail, getResumeThumbnail } from "../utils/cloudinary.js";

// Create a new resume
export const createResume = async (req, res) => {
  if (!req.body.imgData && !req.body.thumbnail) {
    return res.status(400).json({ error: "Either 'imgData' or 'thumbnail' must be provided." });
  }
  let thumbnail;
  if (req.body.imgData) {
    thumbnail = await getResumeThumbnail(req.body.imgData);
  } else {
    // we want to create thumbnail copy so that if original is deleted we have this one
    thumbnail = await getResumeThumbnail(req.body.thumbnail);
  }
  const newResume = await Resume.create({ ...req.body, thumbnail });
  // Update the current user with the new resume
  await User.findOneAndUpdate({ _id: req.user._id }, { $push: { resumeIds: newResume._id } }, { new: true });
  res.status(201).json(newResume);
};

// Get all resumes
export const getAllResumes = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const resumeIds = currentUser.resumeIds;
    const userResumes = await Resume.find({ _id: { $in: resumeIds } });
    res.status(200).json(userResumes);
  } catch (error) {}
};

// Get a specific resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {}
};

// Update a resume by ID
export const updateResumeById = async (req, res) => {
  try {
    const oldResume = await Resume.findById(req.params.id);
    const oldThumbnail = oldResume?.thumbnail;
    await deleteResumeThumbail(oldThumbnail);
    const thumbnail = await getResumeThumbnail(req.body.imgData);
    console.log("new thumbnail", thumbnail);
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, {
      ...req.body,
      thumbnail,
      lastModified: Date.now(),
    });
    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(updatedResume);
  } catch (error) {}
};

// Delete a resume by ID
export const deleteResumeById = async (req, res) => {
  try {
    // Find and delete the resume

    const oldResume = await Resume.findById(req.params.id);
    const oldThumbnail = oldResume?.thumbnail;
    await deleteResumeThumbail(oldThumbnail);
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
  } catch (error) {}
};
