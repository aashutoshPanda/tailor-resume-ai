// controllers/jobController.js
import Job from "../models/jobModel.js";
import User from "../models/UserModel.js";

// Create a new job application
export const createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);

    // Assuming req.user._id contains the current user's ID
    const userId = req.user._id;

    // Update the current user to add the new job application ID
    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { jobIds: newJob._id } }, { new: true });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all job applications
export const getAllJobs = async (req, res) => {
  try {
    // Assuming req.user._id contains the current user's ID
    const userId = req.user._id;

    // Retrieve the current user
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve jobs based on jobIds
    const jobIds = currentUser.jobIds;
    const userJobs = await Job.find({ _id: { $in: jobIds } });

    res.status(200).json(userJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a specific job application by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job application not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job application by ID
export const updateJobById = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: "Job application not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a job application by ID
export const deleteJobById = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job application not found" });
    }

    // Assuming req.user._id contains the current user's ID
    const userId = req.user._id;

    // Update the current user to remove the deleted job application ID
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { jobIds: req.params.id } }, { new: true });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
