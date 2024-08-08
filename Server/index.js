require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static("Public"));
// const options = require('./Controller/Room/tbl_hsptl_room')

const cors = require("cors");
app.use(cors({
        origin:["http://localhost:3000"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
}));
const cookieParser = require("cookie-parser");
app.use(cookieParser())
 
const doctor = require("./Route/DoctorLoginRoute/DoctorLoginRoute");
app.use("/", doctor)

const doctor_view_appointment = require("./Route/AppointmentRoute/appointmentRoute");
app.use("/",doctor_view_appointment);

const ViewPrescription = require("./Route/PrescriptionRoute/prescription");
app.use("/",ViewPrescription);


const Patient = require("./Route/PatientRoute/patientRoute");
app.use("/",Patient);

const report = require('./Route/Report/ReportRoute');
app.use("/",report);






const port = process.env.PORT;


app.listen(port, () => {
        console.log(`connection established ${port}`);
});

