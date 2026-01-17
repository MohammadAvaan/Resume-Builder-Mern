require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

/* ---------- CORS FIX ---------- */
app.use(
  cors({
    origin: [
      "https://resume-builder-mern-alpha.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: handle preflight explicitly
app.options("*", cors());

/* ---------- DB ---------- */
connectDB();

/* ---------- Middleware ---------- */
app.use(express.json());

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

/* ---------- Uploads ---------- */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ---------- Server ---------- */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
