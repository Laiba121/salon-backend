require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/customers", require("./routes/customerRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
