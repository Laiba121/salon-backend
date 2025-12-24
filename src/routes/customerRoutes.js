const express = require("express");
const router = express.Router();
const { createCustomer, getCustomers } = require("../controllers/customerController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware); 

router.post("/create", createCustomer);
router.get("/", getCustomers);

module.exports = router;
