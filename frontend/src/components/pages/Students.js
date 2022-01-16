import React, { useState } from 'react';
import { Row, Col, Container, Table, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const quality = ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'];
//backend theke data asbei sorted hoye so problem nai .
const Students = () => {
  const [name, setName] = useState('');
  const addStudentHandler = (e) => {};
  return (
    <>
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
      <Form onSubmit={addStudentHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Student
        </Button>
      </Form>
    </>
  );
};

export default Students;
