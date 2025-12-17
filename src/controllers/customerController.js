const db = require("../config/firebase");

exports.createCustomer = async (req, res) => {
  try {
    const data = req.body;
    const doc = await db.collection("customers").add(data);
    res.status(201).json({ id: doc.id, ...data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  const snapshot = await db.collection("customers").get();
  const customers = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(customers);
};

exports.getCustomerById = async (req, res) => {
  const doc = await db.collection("customers").doc(req.params.id).get();
  if (!doc.exists) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json({ id: doc.id, ...doc.data() });
};
