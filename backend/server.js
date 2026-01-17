require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

/* =======================
   CORS CONFIG (FIXED)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
    /^http:\/\/localhost:\d+$/,
  "https://resume-builder-mern-alpha.vercel.app",
  "https://resume-builder-mern-pxhb9kdhm-mohammad-avaans-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// VERY IMPORTANT: handle preflight
app.options("*", cors());

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   ROOT ROUTE (IMPORTANT)
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume Builder Backend is running 🚀",
  });
});

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

/* =======================
   STATIC FILES
======================= */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
