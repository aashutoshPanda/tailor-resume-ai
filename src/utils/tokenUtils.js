// utils/tokenUtils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1000h" });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "your-secret-key", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
