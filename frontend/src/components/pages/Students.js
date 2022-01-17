import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const quality = ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'];
//backend theke data asbei sorted hoye so problem nai .
const Students = () => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addStudentHandler = (e) => {
    e.prevenetDefault(); 
  };
  return (
    <>
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Add Student
      </Button>

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
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Bayzit</td>
            <td>
              <Button as={NavLink} to="/details">
                Details
              </Button>
            </td>
            <td>
              <strong className="text-primary">Best</strong>
            </td>
            <td>
              <Button className="mx-3">
                <i className="fas fa-pen"></i>
              </Button>
              <Button variant="danger">
                <i className="fas fa-trash-alt"></i>
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
              <Button className="mx-3">
                <i className="fas fa-pen"></i>
              </Button>
              <Button variant="danger">
                <i className="fas fa-trash-alt"></i>
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
              <Button className="mx-3">
                <i className="fas fa-pen"></i>
              </Button>
              <Button variant="danger">
                <i className="fas fa-trash-alt"></i>
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
              <Button className="mx-3">
                <i className="fas fa-pen"></i>
              </Button>
              <Button variant="danger">
                <i className="fas fa-trash-alt"></i>
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
              <Button className="mx-3">
                <i className="fas fa-pen"></i>
              </Button>
              <Button variant="danger">
                <i className="fas fa-trash-alt"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Students;
