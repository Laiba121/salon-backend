const db = require("../config/firebase");
const { validateAppointment } = require("../validators/appointmentValidator");

exports.createAppointment = async (req, res) => {
  const error = validateAppointment(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const doc = await db.collection("appointments").add(req.body);
  res.status(201).json({ id: doc.id, ...req.body });
};

exports.getAppointments = async (req, res) => {
  const snapshot = await db.collection("appointments").get();
  const appointments = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(appointments);
};

exports.getAppointmentById = async (req, res) => {
  const doc = await db.collection("appointments").doc(req.params.id).get();
  if (!doc.exists) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.json({ id: doc.id, ...doc.data() });
};
