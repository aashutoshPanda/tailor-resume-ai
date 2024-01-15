import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// Connect to MongoDB
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MongoDB URI is missing in the .env file");
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection was successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Here we define the api routes
app.use(routes);

// Routes
app.use("/resume", resumeRoutes);
app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
