const connection = require("../../Model/dbConfig");

const DoctorAppointment = (req, res) => {
        const emp_id = req.params.emp_id
        try {
                const psqlQuery = `SELECT * FROM  confirm_appointment ca JOIN tbl_hsptl_appointment a ON ca.id = a.id  JOIN employee e ON ca.emp_id  = e.emp_id where e.emp_id =($1)`;
                connection.query(psqlQuery,[emp_id], (error, result) => {
                        if (error) {
                                console.log("Error", error);
                                return res.status(500).json({ error: error.sqlMessage });
                        } else {
                                return res.json(result.rows);
                        }
                })
        } catch {
                console.log(error.message.sqlMessage);
                return res.status(500).json({ error: error.sqlMessage });
        }
}

module.exports = { DoctorAppointment }