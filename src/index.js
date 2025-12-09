import "dotenv/config";
import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());

app.use("/api/products", productsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
