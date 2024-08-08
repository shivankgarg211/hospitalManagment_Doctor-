const express = require ("express");
const prescription = express.Router();

const {viewPrescription,addPrescription} = require("../../Controller/Prescription/prescription");
prescription.get("/api/viewprescription/:emp_id",viewPrescription)
prescription.post("/api/addprescription",addPrescription)


module.exports = prescription