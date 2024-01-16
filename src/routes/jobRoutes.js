// routes/jobRoutes.js
import express from "express";
import { createJob, getAllJobs, getJobById, updateJobById, deleteJobById } from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.patch("/:id", updateJobById);
router.delete("/:id", deleteJobById);

export default router;
