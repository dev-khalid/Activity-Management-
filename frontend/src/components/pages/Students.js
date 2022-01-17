import React, { useState } from 'react';
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import BasicConfiguration from '../BasicConfiguration';
const quality = ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'];
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
const Year = ['2022']; //i will make the year dynamic next.
//backend theke data asbei sorted hoye so problem nai .
const Students = () => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateHandler = (studentName) => {
    setShow(true); 
    setName(studentName); 
    
  };
  const deleteHandler = () => {
    if (window.confirm('Are you sure  want to delete this')) {
      console.log('Data deleted')
    } else {
      console.log('Denied');
    }
  };
  const addStudentHandler = (e) => {
    e.prevenetDefault();
  };
  const monthHandler = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate == 'Select Month') {
      alert('Access Denied');
    } else {
      console.log('api call will go here');

      /**@TODO 1.Backend a dekhte hobe jei date dewa hocche tar age kono student createdAt hoiche kina . jodi hoy tahole tar current month er details ante hobe. 2.Current Month er details bolte ante hobe tar STATUS,RANK.And ready korte hobe tar Selected month er history pdf.*/
    }
    //here the api call will go .
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
            <option key={id} value={`${m}/${currentYear}`}>
              {m}/{currentYear}
            </option>
          ))}
        </Form.Select>
      </Form>

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
          <tr>
            <td>1</td>
            <td>Faima Ahmed</td>
            <td>
              <Button as={NavLink} to="/details">
                Details
              </Button>
            </td>
            <td>
              <strong className="text-primary">Very Very Best</strong>
            </td>
            <td>
              <Button className="mx-1" onClick={updateHandler}>
                <i className="fas fa-pen"></i>
              </Button>
              <Button className="mx-1" variant="danger" onClick={deleteHandler}>
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button variant="info">
                <i className="fas fa-file-pdf"></i>
              </Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Mursalin</td>
            <td>
              <Button>Details</Button>
            </td>
            <td>
              <strong className="text-info">Good</strong>
            </td>
            <td>
              <Button className="mx-1">
                <i className="fas fa-pen"></i>
              </Button>
              <Button className="mx-1" variant="danger">
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button variant="info">
                <i className="fas fa-file-pdf"></i>
              </Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Taniya</td>
            <td>
              <Button>Details</Button>
            </td>
            <td>
              <strong className="text-success">Medium</strong>
            </td>
            <td>
              <Button className="mx-1">
                <i className="fas fa-pen"></i>
              </Button>
              <Button className="mx-1" variant="danger">
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button variant="info">
                <i className="fas fa-file-pdf"></i>
              </Button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Sumiya</td>
            <td>
              <Button>Details</Button>
            </td>
            <td>
              <strong className="text-warning">Bad</strong>
            </td>
            <td>
              <Button className="mx-1">
                <i className="fas fa-pen"></i>
              </Button>
              <Button className="mx-1" variant="danger">
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button variant="info">
                <i className="fas fa-file-pdf"></i>
              </Button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Sabit</td>
            <td>
              <Button>Details</Button>
            </td>
            <td>
              <strong className="text-danger">Very Bad</strong>
            </td>
            <td>
              <Button className="mx-1">
                <i className="fas fa-pen"></i>
              </Button>
              <Button className="mx-1" variant="danger">
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button variant="info">
                <i className="fas fa-file-pdf"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Students;
