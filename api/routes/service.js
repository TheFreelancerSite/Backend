const express = require("express");
const serviceController = require("../controllers/services");
const router = express.Router();

router.get('/',serviceController.getAllServices)
router.post("/add/:userId",serviceController.createService)

module.exports = router;