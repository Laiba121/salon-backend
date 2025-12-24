const express = require("express");
const router = express.Router();
const { createService, getServices } = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware); 

router.post("/create", roleMiddleware("admin"), createService);
router.get("/", getServices);

module.exports = router;
