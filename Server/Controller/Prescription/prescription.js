const connection = require("../../Model/dbConfig");

const viewPrescription =(req,res)=>{
        console.log(req.params)
       try {
        const emp_id = req.params.emp_id
                const psqlQuery = `SELECT * FROM prescription wHERE emp_id = $1`;
                connection.query(psqlQuery,[emp_id],(error,result)=>{
                        if(error){
                                console.log("Error",error.message)
                        }else{
                                res.json(result)
                        }
                })
        
       } catch (error) {
         console.log(error)
       }
}
const addPrescription = (req, res) => {
        try {
            const { id, medicine, dose, frequency, emp_id } = req.body;
    
            if (!id || !medicine || !dose || !frequency || !emp_id) {
                return res.status(400).json({ error: "All fields are required" });
            }
    
            const psqlQuery = `INSERT INTO prescription (id, medicine, dose, frequency, emp_id) VALUES ($1, $2, $3, $4, $5)`;
            
            connection.query(psqlQuery, [id, medicine, dose, frequency, emp_id], (error, result) => {
                if (error) {
                    console.error("Error", error.message);
                    return res.status(500).json({ error: error.message });
                } else {
                    res.status(201).json(result);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };
    
module.exports = {viewPrescription,addPrescription}