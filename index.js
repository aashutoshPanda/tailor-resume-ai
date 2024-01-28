import express from "express";
import routes from "./src/routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import setup from "./db.js";

const app = express();

// mongo db setup
setup();
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Here we define the api routes
app.use(routes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

export default app;
