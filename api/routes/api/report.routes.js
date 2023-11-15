const express = require("express");
const router = express.Router();

const {sendReport,getAllReports} = require("../../controllers/report")




router.post('/report' ,sendReport) 
router.get("/getreport",getAllReports)

module.exports = router;
