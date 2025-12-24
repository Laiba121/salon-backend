const { db } = require("../config/firebase");

// Create service (admin only)
const createService = async (req, res) => {
  try {
    const { name, price, duration } = req.body;

    if (!name || !price || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const serviceRef = db.collection("services").doc();
    await serviceRef.set({
      name,
      price,
      duration,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Service created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all services
const getServices = async (req, res) => {
  try {
    const servicesSnap = await db.collection("services").get();
    const services = servicesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createService, getServices };
