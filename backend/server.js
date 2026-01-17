const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* =======================
   CORS (SAFE – NO app.options)
======================= */
app.use(
  cors({
    origin: [
      "https://resume-builder-mern-alpha.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   Body Parsers
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =======================
   Routes
======================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));

/* =======================
   Server
======================= */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
