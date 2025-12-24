const { db } = require("../config/firebase");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRef = db.collection("users").doc(req.user.userId);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = userSnap.data();

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = roleMiddleware;
