"use client";
import { useEffect, useState } from "react";
import Layout from "../component/Layout";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import GivePrescription from "./GivePrescription";
import AddReport from "./AddReport";

function Appointment() {
  const [user, setUser] = useState({});
  const [uservalue, setUserValue] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const viewDoctorAppointment = (empId) => {
    axios
      .get(`http://localhost:5004/api/doctor/getappointment/${empId}`)
      .then((result) => {
        console.log(result.data);
        setUserValue(result.data);
        setFilterData(result.data); // Initialize filterData with the fetched data
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const newData = filterData.filter((row) =>
      row.name.toLowerCase().includes(value)
    );
    setUserValue(newData);
  };

  useEffect(() => {
    const empData = localStorage.getItem("empid");
    if (empData) {
      try {
        const parsedData = JSON.parse(empData);
        setUser(parsedData.user);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error('No data found for key "empid"');
    }
  }, []);

  useEffect(() => {
    if (user.emp_id) {
      viewDoctorAppointment(user.emp_id);
    }
  }, [user.emp_id]);

  const columns = [
    {
      name: "Patient ID",
      selector: (row) => row.id,
    },
    {
      name: "Patient Name",
      selector: (row) => row.name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Symptoms",
      selector: (row) => row.symptoms,
    },
    {
      name: "Appointment Date",
      selector: (row) => moment(row.appointment_date).format("DD-MM-YYYY"),
    },
    {
      name: "Appointment Time",
      selector: (row) => row.time,
    },
    {
      name: "Add Prescription",
      cell: (row) => <GivePrescription data={row} />,
    },
    {
      name: "Add Report",
      cell: (row) => <AddReport data={row} />,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
        height: "auto",
        color: "black",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "black",
        backgroundColor: "#0D9276",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <h3 className="text-center text-3xl font-bold">Patient List</h3>
        </div>
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            className="w-64 border border-gray-400 p-2 rounded-lg transition duration-300 ease-in-out hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            onChange={handleSearch}
          />
        </div>
        <DataTable
          columns={columns}
          data={uservalue}
          customStyles={customStyles}
          pagination
          paginationPerPage={10}
          fixedHeader
          highlightOnHover
          responsive
          className="w-full"
        />
      </div>
    </Layout>
  );
}

export default Appointment;
