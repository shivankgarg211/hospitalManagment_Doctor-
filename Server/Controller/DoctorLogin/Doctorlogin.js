const bcrypt = require('bcrypt'); // Ensure you require bcrypt
const jwt = require('jsonwebtoken'); // Ensure you require jsonwebtoken
const connection = require('../../Model/dbConfig')



const Doctorlogin = (req, res) => {
  try {
    const psqlQuery = `SELECT e.emp_id, e.emp_name, e.dept_id, e.email, e.password, 
    ARRAY_AGG(r.role_name) AS roles FROM employee e 
    JOIN tbl_hsptl_role_assign ra ON e.emp_id = ra.emp_id 
    JOIN tbl_hsptl_role r ON ra.role_id = r.role_id 
    WHERE e.email = $1 
    GROUP BY e.emp_id, e.emp_name, e.dept_id, e.email, e.password`;

    connection.query(psqlQuery, [req.body.email], (error, result) => {
      if (error) {
        // console.error("Query Error:", error);
        return res.json({ loginStatus: false, error: "Query Error" });
      }

      if (result.rows.length > 0) {
        const user = result.rows[0];
        // console.log("User found:", user);

        bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
          if (error) {
            // console.error("Password Compare Error:", error);
            return res.json({ loginStatus: false, error: "Password Compare Error" });
          } else if (isMatch) {
            if (!user.roles.includes('Doctor')) {
              return res.json({ loginStatus: false, error: "You are not authorized" });
            }
            const emp_id = user.emp_id
            const email = user.email;
            const role = user.roles;
            const token = jwt.sign({ roles: role, email: email,emp_id:emp_id }, 'ne-secret-key-for-doctor-module', { expiresIn: '1d' });
            res.cookie('garg', token);
            // console.log("Login successful, token generated:", token);
            return res.json({ loginStatus: true });
          } else {
            // console.log("Invalid password for email:", req.body.email);
            return res.json({ loginStatus: false, error: "Invalid password" });
          }
        });
      } else {
        // console.log("Email not found:", req.body.email);
        return res.json({ loginStatus: false, error: "Email does not exist" });
      }
    });
  } catch (err) {
    // console.error("Login error", err);
    return res.json({ loginStatus: false, error: "Login error in server" });
  }
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.garg;

  if (!token) {
    return res.status(404).json({ Error: "You are not authenticated" });
  }

  jwt.verify(token, 'ne-secret-key-for-doctor-module', (err, decoded) => {
    if (err) {
      return res.json({ Error: "Token is not okay" });
    }

    req.emp_id = decoded.emp_id;
    req.emp_name = decoded.emp_name;
    req.email = decoded.email;
    req.roles = decoded.roles;
    next();
  });
};

const verifyUser = (req, res) => {
  const user = {
    emp_id: req.emp_id,
    emp_name: req.emp_name,
    email: req.email,
    roles: req.roles
  };
  return res.json({ Status: 'Success', user });
};



module.exports = { Doctorlogin, verifyToken, verifyUser };
