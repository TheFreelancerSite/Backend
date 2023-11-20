const express = require("express");
const router = express.Router();

const {sendReport,getAllReports,deleteReport} = require("../../controllers/report")




router.post('/report' ,sendReport) 
router.get("/getreport",getAllReports)
router.delete('/deleteReport/:reportId', deleteReport);

module.exports = router;
