import express from "express";
import resumeRouter from "./resumeRoutes.js";
import jobRouter from "./jobRoutes.js";

const router = express.Router();

router.use("/resumes", resumeRouter);
router.use("/jobs", jobRouter);

export default router;
