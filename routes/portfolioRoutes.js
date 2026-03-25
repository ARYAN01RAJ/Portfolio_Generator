const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

router.get("/", portfolioController.getSelectorPage);
router.get("/portfolio", portfolioController.getPortfolio);

module.exports = router;