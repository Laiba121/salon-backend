require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/services", serviceRoutes);

// Use PORT from .env
const PORT = process.env.PORT;
if (!PORT) {
  console.error("PORT is not defined in .env");
  process.exit(1);
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
