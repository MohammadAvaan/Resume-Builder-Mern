require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

/* =======================
   CORS CONFIG (NODE 22 SAFE)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://resume-builder-mern-alpha.vercel.app",
  "https://resume-builder-mern-pxhb9kdhm-mohammad-avaans-projects.vercel.app",
];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://resume-builder-mern-alpha.vercel.app",
      "https://resume-builder-mern-pxhb9kdhm-mohammad-avaans-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   ROUTES
======================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

/* =======================
   STATIC
======================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
