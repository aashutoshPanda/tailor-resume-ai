import express from "express";
import { login, register, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route   POST /auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /auth/debug-user
 * @desc    Register a new user
 * @access  Public
 */
router.get("/users", getAllUsers);

export default router;
