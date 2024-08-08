"use client";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

function AddReport({ data }) {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const [inputValue, setInputValue] = useState({
    id: data.id,
    report_id: "",
    report_type: "",
    summary: "",
    emp_id: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5004/api/addpatientreport", inputValue)
      .then((res) => {
        console.log(res);
        handleClose()
        alert("Report added")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const empData = localStorage.getItem("empid");
    if (empData) {
      try {
        const parsedData = JSON.parse(empData);
        setUser(parsedData.user);
        setInputValue((prev) => ({
          ...prev,
          emp_id: parsedData.user.emp_id,
        }));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error('No data found for key "empid"');
    }
  }, []);

  return (
    <div>
      <Button
        onClick={handleShow}
        style={{
          background: "#0D9276",
          color: "black",
          border: "2px solid #0D9276",
        }}
      >
        <AddCircleOutlineIcon />
      </Button>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          style={{ marginTop: "8vh" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Report</Modal.Title>
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
                <Form.Label>Report ID</Form.Label>
                <Form.Control
                  type="text"
                  name="report_id"
                  placeholder="Enter id"
                  autoComplete="off"
                  value={inputValue.report_id}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, report_id: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Control
                  type="text"
                  name="report_type"
                  placeholder="Enter report"
                  autoComplete="off"
                  value={inputValue.report_type}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      report_type: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  type="textarea"
                  name="summary"
                  placeholder="Enter Frequency"
                  autoComplete="off"
                  value={inputValue.summary}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, summary: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Emp Id</Form.Label>
                <Form.Control
                  type="text"
                  name="emp_id"
                  placeholder="Enter Emp ID"
                  autoComplete="off"
                  value={inputValue.emp_id}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, emp_id: e.target.value })
                  }
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
    </div>
  );
}

export default AddReport;
