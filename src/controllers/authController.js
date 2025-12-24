const { db } = require("../config/firebase");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userRef = db.collection("users").doc();
    const hashedPassword = await hashPassword(password);

    await userRef.set({
      name,
      email,
      password: hashedPassword,
      role, // admin or staff
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersSnap = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (usersSnap.empty) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userDoc = usersSnap.docs[0];
    const user = userDoc.data();

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: userDoc.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
