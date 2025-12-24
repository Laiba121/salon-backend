require("dotenv").config(); // ✅ MUST BE FIRST LINE

const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/auth", authRoutes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

