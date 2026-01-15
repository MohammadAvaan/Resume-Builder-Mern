require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// =======================
// CORS Configuration
// =======================
app.use(
  cors({
    origin: "https://resume-builder-mern-alpha.vercel.app", // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight requests
app.options("*", cors());

// =======================
// Connect Database
// =======================
connectDB();

// =======================
// Middleware
// =======================
app.use(express.json());

// =======================
// Safe Route Mounting
// =======================

// Use relative paths ONLY
// If you want a dynamic BASE_URL, fallback to a safe default
const AUTH_BASE_URL = process.env.AUTH_BASE_URL || "/api/auth";
const RESUME_BASE_URL = process.env.RESUME_BASE_URL || "/api/resume";

app.use(AUTH_BASE_URL, authRoutes);
app.use(RESUME_BASE_URL, resumeRoutes);

// =======================
// Serve uploads folder
// =======================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set(
        "Access-Control-Allow-Origin",
        "https://resume-builder-mern-alpha.vercel.app"
      );
    },
  })
);

// =======================
// Optional: Log all routes at startup
// =======================
const listEndpoints = require("express-list-endpoints");
console.log("Mounted routes:", listEndpoints(app));

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
