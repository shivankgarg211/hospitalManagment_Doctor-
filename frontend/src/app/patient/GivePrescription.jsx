"use client";
import React, { useEffect, useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

const GivePrescription = ({ data }) => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState({
    id: data.id,
    medicine: "",
    dose: "",
    frequency: "",
    emp_id: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const empData = localStorage.getItem("empid");
    if (empData) {
      try {
        const parsedEmpData = JSON.parse(empData);
        setUser(parsedEmpData.user);
        setInputValue((prevValues) => ({
          ...prevValues,
          emp_id: parsedEmpData.user.emp_id
        }));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error('No data found for key "empid"');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5004/api/addprescription", inputValue)
      .then((res) => {
        console.log(res);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        onClick={handleShow}
        style={{
          background: "#0D9276",
          color: "black",
          border:"2px solid #0D9276"
        }}
      >
        <AddIcon />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{marginTop:"8vh"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Patient Id</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="Enter pID"
                autoComplete="off"
                value={data.id}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Medicine</Form.Label>
              <Form.Control
                type="text"
                name="medicine"
                placeholder="Enter Medicine"
                autoComplete="off"
                value={inputValue.medicine}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dose</Form.Label>
              <Form.Control
                type="number"
                name="dose"
                placeholder="Enter Dose"
                autoComplete="off"
                value={inputValue.dose}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                name="frequency"
                placeholder="Enter Frequency"
                autoComplete="off"
                value={inputValue.frequency}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Emp Id</Form.Label>
              <Form.Control
                type="text"
                name="emp_id"
                placeholder="Enter Emp ID"
                autoComplete="off"
                value={user.emp_id}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GivePrescription;
