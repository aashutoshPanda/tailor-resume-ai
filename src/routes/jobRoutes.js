// routes/jobRoutes.js
import express from "express";
import { createJob, getAllJobs, getJobById, updateJobById, deleteJobById } from "../controllers/jobControllers.js";
import { isJobOwner } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", isJobOwner, getJobById);
router.patch("/:id", isJobOwner, updateJobById);
router.delete("/:id", isJobOwner, deleteJobById);

export default router;
