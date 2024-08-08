const connection = require("../../Model/dbConfig");

const patient = (req, res) => {
        const emp_id = req.params.emp_id;
        try {
            const psqlQuery = `
                SELECT 
                p.p_name AS patient_name, 
                e.emp_name AS doctor_name,
                   p.p_id ,
                    p.age, 
                    p.gender, 
                    p.mobile, 
                    p.city, 
                    p.symptoms, 
                    t.date
                FROM 
                    tbl_hsptl_treatment t 
                JOIN 
                    tbl_hsptl_patient p ON t.p_id = p.p_id  
                JOIN 
                    employee e ON t.emp_id = e.emp_id 
                WHERE 
                    e.emp_id = $1`;
    
            connection.query(psqlQuery, [emp_id], (error, result) => {
                if (error) {
                    console.log("Error", error);
                    return res.status(500).json({ error: error.message });
                } else {
                    return res.status(200).json(result.rows);
                }
            });
        } catch (error) {
            console.log("Error", error.message);
            return res.status(500).json({ error: error.message });
        }
    };
    
    module.exports = { patient };

module.exports = { patient }