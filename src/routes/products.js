// routes/products.js
import { Router } from "express";
import db from "../firebase.js"; 

const router = Router();

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const docRef = await db.collection("products").add({ name, price });
    const newProduct = { id: docRef.id, name, price };
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const docRef = db.collection("products").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
