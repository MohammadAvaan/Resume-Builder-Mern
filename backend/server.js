require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

/* =======================
   TRUST RENDER PROXY
======================= */
app.set("trust proxy", 1);

/* =======================
   CORS — MUST BE FIRST
======================= */
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://resume-builder-mern-alpha.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   BODY PARSERS
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

/* =======================
   ROUTES (AFTER CORS)
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
