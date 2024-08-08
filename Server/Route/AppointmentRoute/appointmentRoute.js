const express = require ('express');

const appointment = express.Router();

const {DoctorAppointment} = require('../../Controller/Appointment/appointment')
appointment.get("/api/doctor/getappointment/:emp_id",DoctorAppointment);

module.exports = appointment;