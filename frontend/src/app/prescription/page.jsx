"use client";
import { useEffect, useState } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment";

function Prescription() {
  const [user, setUser] = useState([]);
  const [getPrescription, setGetPrescription] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    let empData = localStorage.getItem("empid");
    if (empData) {
      try {
        empData = JSON.parse(empData);
        setUser(empData.user);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error('No data found for key "empid"');
    }
  }, []);

  useEffect(() => {
    if (user.emp_id) {
      viewPrescription(user.emp_id);
    }
  }, [user.emp_id]);

  const viewPrescription = async (empId) => {
    await axios
      .get(`http://localhost:5004/api/viewprescription/${empId}`)
      .then((result) => {
        console.log(result.data.rows);
        setGetPrescription(result.data.rows);
        setFilterData(result.data.rows); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const newData = filterData.filter((row) =>
      row.id.toString().toLowerCase().includes(value)
    );
    setGetPrescription(newData);
  };

  const columns = [
    {
      name: "Patient ID",
      selector: (row) => row.id,
    },
    {
      name: "Prescription Date",
      selector: (row) => moment(row.pre_date).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      name: "Medicine",
      selector: (row) => row.medicine,
    },
    {
      name: "Dose",
      selector: (row) => row.dose,
    },
    {
      name: "Frequency",
      selector: (row) => row.frequency,
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
          <h3 className="text-center text-3xl font-bold">Prescription List</h3>
        </div>
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by ID"
            className="w-full md:w-64 border border-gray-400 p-2 rounded-lg transition duration-300 ease-in-out hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            onChange={handleSearch}
          />
        </div>
        <DataTable
          columns={columns}
          data={getPrescription}
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

export default Prescription;
