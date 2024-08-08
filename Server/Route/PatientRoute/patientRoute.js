const express = require ("express");
const Patient = express.Router();

const {patient}  = require('../../Controller/patientlist/assign_patient')
Patient.get("/api/viewPatient/:emp_id",patient);


module.exports = Patient