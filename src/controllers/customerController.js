const { db } = require("../config/firebase");

// Create customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const customerRef = db.collection("customers").doc();
    await customerRef.set({
      name,
      email,
      phone,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Customer created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customersSnap = await db.collection("customers").get();
    const customers = customersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createCustomer, getCustomers };
