require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

/* ---------- CORS (EXPRESS 5 SAFE) ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-builder-mern-alpha.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ---------- DB ---------- */
connectDB();

/* ---------- Middleware ---------- */
app.use(express.json());

/* ---------- Test Route ---------- */
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

/* ---------- Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

/* ---------- Uploads ---------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- Server ---------- */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
