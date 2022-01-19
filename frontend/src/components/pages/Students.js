import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BasicConfiguration from '../BasicConfiguration';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
// const quality = ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'];
const admin = '11XWcMJ3cQdFy5U2zODmAAawWCm1';
const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const currentYear = new Date().getFullYear();
const currentMonth = `${
  Month[new Date().getMonth()]
}-${new Date().getFullYear()}`;
// const Year = ['2022']; //i will make the year dynamic next.
//backend theke data asbei sorted hoye so problem nai .

const Students = () => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(currentMonth);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const { currentUser } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllStudent = async () => {
    setLoading(true);
    const { data } = await axios.get(`api/student/${month}`);
    function compare(a, b) {
      if (
        a.monthly[0].regularPercentage + a.monthly[0].examPercentage <
        b.monthly[0].regularPercentage + b.monthly[0].examPercentage
      ) {
        return 1;
      }
      if (
        a.monthly[0].regularPercentage + a.monthly[0].examPercentage >
        b.monthly[0].regularPercentage + b.monthly[0].examPercentage
      ) {
        return -1;
      }
      return 0;
    }

    data.sort(compare);
    setStudents(data);
    setLoading(false);
  };
  useEffect(() => {
    getAllStudent();
  }, [month]);

  const updateHandler = (studentName) => {
    setShow(true);
    setName(studentName);
  };
  const deleteHandler = (studentId) => {
    if (window.confirm('Are you sure  want to delete this')) {
      console.log('Data deleted');
    } else {
      console.log('Denied');
    }
  };
  const addStudentHandler = (e) => {
    e.preventDefault();
    const createStudent = async () => {
      const { data } = await axios.post('api/student', {
        name,
        month,
      });
    };
    createStudent();
    getAllStudent();
  };
  const monthHandler = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate == 'Select Month') {
      alert('Please Select a valid month');
    } else {
      setMonth(selectedDate);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <div>
          <Button variant="primary" onClick={handleShow}>
            Add Student
          </Button>
        </div>
        <div>
          {' '}
          <BasicConfiguration />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addStudentHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Form className="py-3">
        <Form.Select
          onChange={monthHandler}
          aria-label="Default select example"
        >
          <option>Select Month</option>
          {Month.map((m, id) => (
            <option key={id} value={`${m}-${currentYear}`}>
              {m}/{currentYear}
            </option>
          ))}
        </Form.Select>
      </Form>
      {loading && (
        <h3 className="d-flex justify-content-center py-3">
          <Spinner
            animation="grow"
            variant="primary"
            style={{
              width: '150px',
              height: '150px',
            }}
          />
        </h3>
      )}

      <Table
        style={{
          textAlign: 'center',
        }}
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>View Details</th>
            <th>Quality</th>
            <th style={{ width: '200px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {!loading && students.length > 0 ? (
            <>
              {students.map((student, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{student.name}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/details`}
                      state={{
                        studentId: student._id,
                        month,
                        name: student.name,
                      }}
                    >
                      Details
                    </Button>
                  </td>
                  <td>
                    <strong className="text-primary">
                      {student.monthly[0].quality}
                    </strong>
                  </td>
                  <td>
                    {currentUser.uid === admin && (
                      <>
                        <Button
                          className="mx-1"
                          onClick={() => updateHandler(student.name)}
                        >
                          <i className="fas fa-pen"></i>
                        </Button>
                        <Button
                          className="mx-1"
                          variant="danger"
                          onClick={() => deleteHandler(student._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </>
                    )}

                    <Button variant="info">
                      <i className="fas fa-file-pdf"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              {!loading && students.length == 0 ? (
                <td>No Data found!</td>
              ) : (
                <td colSpan={5}>Loading Please Wait...</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Students;
