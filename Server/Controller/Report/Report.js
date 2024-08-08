const connection = require("../../Model/dbConfig");


const addPatientReport =(req,res)=>{
        try {
                const {report_id,id,report_type,summary,emp_id} = req.body;
                const psqlQuerr =`INSERT INTO patient_report(report_id,id,report_type,summary,emp_id) values($1,$2,$3,$4,$5)`
                connection.query(psqlQuerr,[report_id,id,report_type,summary ,emp_id],(error,result)=>{
                        if(error){
                                console.log(error);
                        }
                        else{
                                res.json(result)
                        }
                })

                
        } catch (error) {
               console.log(error) 
        }

}
const viewPatientReport = (req, res) => {
        try {
            const id = req.params.id
            const psqlQuery = `SELECT * FROM patient_report WHERE id = $1`;
    
            connection.query(psqlQuery, [id], (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Database query error' });
                }
    
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'Patient report not found' });
                }
    
                res.json(result.rows[0]);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    };
    
    module.exports = viewPatientReport;
    
module.exports = {addPatientReport,viewPatientReport}