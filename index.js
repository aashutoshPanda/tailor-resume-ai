import express from "express";
import routes from "./src/routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import setup from "./db.js";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

const app = express();
Sentry.init({
  dsn: "https://3d838c356804be2fac54be30566b33de@o4506682907951104.ingest.sentry.io/4506682910638080",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// mongo db setup
setup();
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Here we define the api routes
app.use(routes);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

export default app;
