const express = require ("express");
const report = express.Router();

const {addPatientReport,viewPatientReport} = require('../../Controller/Report/Report')
report.post('/api/addpatientreport',addPatientReport);
report.get('/api/viewpatientreport/:id',viewPatientReport);

module.exports = report