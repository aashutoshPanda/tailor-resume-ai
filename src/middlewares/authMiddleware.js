/**
 * Auth middleware
 */
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        console.log("Error from auth middleware", err);
        res.sendStatus(403);
      } else {
        const user = await User.findOne({ _id: authData.id });
        if (!user) {
          console.log("Error from auth middleware", err);
          res.sendStatus(403);
        } else {
          req.user = user;
          next();
        }
      }
    });
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isResumeOwner = async (req, res, next) => {
  // Assuming req.user._id contains the current user's ID
  const userId = req.user._id;

  // Retrieve the current user
  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Extract resume ID from req.params
  const requestedResumeId = req.params.id;

  // Check if the requested ID is in the user's resumeIds
  if (currentUser.resumeIds.includes(requestedResumeId)) {
    // ID is present, allow the request to proceed
    next();
  } else {
    // ID is not present, send a 403 Forbidden response
    res.status(403).json({ message: "Permission denied. You do not have access to this resource." });
  }
};

export const isJobOwner = async (req, res, next) => {
  // Assuming req.user._id contains the current user's ID
  const userId = req.user._id;

  // Retrieve the current user
  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Extract job ID from req.params
  const requestedJobId = req.params.id;

  // Check if the requested ID is in the user's jobIds
  if (currentUser.jobIds.includes(requestedJobId)) {
    // ID is present, allow the request to proceed
    next();
  } else {
    // ID is not present, send a 403 Forbidden response
    res.status(403).json({ message: "Permission denied. You do not have access to this resource." });
  }
};
