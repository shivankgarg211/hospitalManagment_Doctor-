const express = require ("express");
const doctor = express.Router();

const {Doctorlogin, verifyToken, verifyUser} = require("../../Controller/DoctorLogin/Doctorlogin")
doctor.post("/api/DoctorLogin",Doctorlogin);
doctor.get('/api/verifytoken',verifyToken, verifyUser)

module.exports = doctor