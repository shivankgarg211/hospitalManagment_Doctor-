"use client";
import axios from "axios";
import Layout from "../component/Layout";
import { Chart } from "react-google-charts";
import React, { useState, useEffect } from "react";
import Appointment from "../appointment/page";


function Doctor() {
  const [user, setUser] = useState([]);

  const verifyUser = () => {
    axios
      .get("http://localhost:5004/api/verifytoken", { withCredentials: true })
      .then((res) => {
      localStorage.setItem('empid',JSON.stringify(res.data)) 
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const data = [
    ["Language", "Speakers (in millions)"],
    ["Assamese", 13],
    ["Bengali", 83],
    ["Bodo", 1.4],
    ["Dogri", 2.3],
    ["Gujarati", 46],
    ["Hindi", 300],
    ["Kannada", 38],
    ["Kashmiri", 5.5],
    ["Konkani", 5],
    ["Maithili", 20],
    ["Malayalam", 33],
    ["Manipuri", 1.5],
    ["Marathi", 72],
    ["Nepali", 2.9],
    ["Oriya", 33],
    ["Punjabi", 29],
    ["Sanskrit", 0.01],
    ["Santhali", 6.5],
    ["Sindhi", 2.5],
    ["Tamil", 61],
    ["Telugu", 74],
    ["Urdu", 52],
  ];

  const options = {
    title: "Indian Language Use",
    legend: "none",
    pieSliceText: "label",
    slices: {
      4: { offset: 0.2 },
      12: { offset: 0.3 },
      14: { offset: 0.4 },
      15: { offset: 0.5 },
    },
  };

  const data1 = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];

  const options1 = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };

  return (
    
      <Layout>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Doctor */}
            <div className="bg-red-500 text-white rounded-lg shadow-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-shopping-cart text-3xl"></i>
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold">Doctor</h5>
                  <h2 className="text-2xl font-bold">3,243</h2>
                  <div className="flex items-center">
                    <span className="text-lg">12.5%</span>
                    <i className="fa fa-arrow-up ml-1"></i>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-cyan-500 h-2.5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Patient */}
            <div className="bg-blue-800 text-white rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-users text-3xl"></i>
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold">Patient</h5>
                  <h2 className="text-2xl font-bold">15.07k</h2>
                  <div className="flex items-center">
                    <span className="text-lg">9.23%</span>
                    <i className="fa fa-arrow-up ml-1"></i>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Appointment */}
            <div className="bg-green-300 text-white rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-ticket-alt text-3xl"></i>
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold">Appointment</h5>
                  <h2 className="text-2xl font-bold">578</h2>
                  <div className="flex items-center">
                    <span className="text-lg">10%</span>
                    <i className="fa fa-arrow-up ml-1"></i>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-orange-500 h-2.5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Chart
                chartType="BarChart"
                width="100%"
                height="300px"
                data={data1}
                options={options1}
              />
            </div>
            <div>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"300px"}
              />
            </div>
          </div>
          <div>
          </div>
        </div>
      </Layout>
      
    
  );
}

export default Doctor;
