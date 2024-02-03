import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/**
 * @desc POST login for a user
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const userAll = await User.find();
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Invalid Password!",
    });
  }
  // This is intentional | This project is just for learning, I wanted to have simple guest login
  // So making a guest token with very long expiry
  const secondsIn50Years = 50 * 365 * 24 * 60 * 60; // 50 years * 365 days/year * 24 hours/day * 60 minutes/hour * 60 seconds/minute
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: secondsIn50Years,
  });
  res.status(200).send({
    id: user.id,
    email,
    token,
  });
};

/**
 * @desc POST register for a user
 */
export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const { email, password, fullName } = req.body;
  const encryptedPassword = await bcrypt.hash(password, salt);
  const { id } = await User.create({ email, password: encryptedPassword, fullName });
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  res.status(201).json({ id, email, token });
};

/**
 * @desc GET Get all the users for debugging
 */
export const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(201).json(allUsers);
};
