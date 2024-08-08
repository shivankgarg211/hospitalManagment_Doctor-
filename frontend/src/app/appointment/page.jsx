// "use client"
// import { useContext, useEffect, useState } from "react";
// import Layout from "../component/Layout";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import moment from "moment";




// function Appointment() {
//  const [user,setUser]=useState([])

// const newEmp= user.emp_id

// const [uservalue,setUserValue] = useState([])

// const viewDoctorAppointment = () => {
//   axios
//     .get(`http://localhost:5004/api/doctor/getappointment/${newEmp}`) 
//     .then((result)=>{
//       setUserValue(result.data)
//       console.log(result.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
   
// };




// useEffect(() => {
  
//   let empData = localStorage.getItem("empid");

//   if (empData) {
//     try {
//       empData = JSON.parse(empData);
  
//       setUser(empData.user);
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//     }
//   } else {
//     console.error('No data found for key "empid"');
//   }
  
// }, []);

// useEffect(() => {
//   if (user.emp_id) {
//     viewDoctorAppointment(user.emp_id);
//   }
// }, [user.emp_id]);


     
//   const columns = [
//     // {
//     //   name: "Id",
//     //   selector: (row) => row.emp_id,
//     // },
//     {
//       name: "Appointment id",
//       selector: (row) => row.id,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
     
//     },
//     // {
//     //   name: "Mobile",
//     //   selector: (row) => row.mobile,
//     // },
//     {
//       name: "Gender",
//       selector: (row) => row.gender,
//     },
//     {
//       name: "Age",
//       selector: (row) => row.age,
//     },
//     {
//       name: "Symptoms",
//       selector: (row) => row.symptoms,
//     },
//     {
//       name: "Appointment Date",
//       selector: (row) => moment(row.appointment_date).format("DD-MM-YYYY")
//     },
//     // {
//     //   name: "Patient Email",
//     //   selector: (row) => row.email,  
//     // },
//     {
//       name: "Appointment Time",
//       selector: (row) => row.time,
//     },
//     // {
//     //   name: "Doctor Name",
//     //   selector: (row) => row.emp_name,
//     // },
//     // {
//     //   name: "Department",
//     //   selector: (row) => row.dept_id,
//     // },
//     // {
//     //   name: "Password",
//     //   selector: (row) => row.password,
//     // },
//   ];
//   const customStyles = {
//     rows: {
//       style: {
//         minHeight: "1px",
//          height: "3.1vw",
//         color: "black",
//       },
//     },
//     headCells: {
//       style: {
//         fontWeight: "bold",
//         fontSize: "15px",
//         color: "black",
//         backgroundColor: "#0D9276",
//       },
//     },
//     cells: {
//       style: {
//         fontSize: "15px",
//       },
//     },
//   };
//   return (
//     <Layout>
//     <div>
//     <div className="flex justify-center mb-4">
//           <h3 className="text-center text-3xl font-bold">Appointment List</h3>
//         </div>
//         <div className="flex justify-end mb-4 ">
//           <input
//             type="text"
//             placeholder="Search by Name"
//             className="w-64 border border-gray-400 p-2 rounded-lg transition duration-300 ease-in-out hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
//           />
//         </div>
//         <DataTable
//               columns={columns}
//                data={uservalue}
//               customStyles={customStyles}
//               pagination
//               paginationPerPage={10}
//               fixedHeader
//               highlightOnHover
//               responsive
//               />
//               </div>
//     </Layout>
//   )
// }

// export default Appointment

