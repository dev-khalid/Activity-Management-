import React, { useState, useeffect } from 'react';
import { Table, Badge, Button, Form, Modal } from 'react-bootstrap';
import Summary from '../Summary';
import { useParams } from 'react-router-dom';

/** @TODO 1.FIRST A DATABASE THEKE JINISH GULA ANTE HOBE . 2.jodi viva aksed questions thake tahole ekhane modal er moddhe viva answered appeared hobe . 3.jodi test full mark thake tahole amar ekhane test score appear hobe .  */

const Details = () => {
  const { studentId } = useParams();
  
  const name = 'akash';
  const [show, setShow] = useState(false);
  const [attandance, setAttandance] = useState(true);
  const [homework, setHomeWork] = useState('None');
  const [late, setLate] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [vivaAnswered, setVivaAnswered] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = (e) => {
    e.prevenetDefault();
    console.log('api call should be made');
  };
  return (
    <>
      <Summary name={name} />
      <Button className="mt-3">Download Statistics</Button>
      {/**@TODO this section is only for admin */}
      <Button className="mt-3 mx-3 " onClick={handleShow}>
        Add Todays Data
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity of {name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="attandance">
              <Form.Label>Attandance</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setAttandance(e.target.value);
                }}
              >
                <option value={true}>{`✔`}</option>
                <option value={false}>{`❌`}</option>
              </Form.Select>
            </Form.Group>
            {/**@TODO homwwork conditionally render korte hobe. */}
            <Form.Group className="mb-3" controlId="homework">
              <Form.Label>Home Work</Form.Label>
              <Form.Control
                value={homework}
                onChange={(e) => {
                  setHomeWork(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="late">
              <Form.Label>Late</Form.Label>
              <Form.Control
                value={late}
                onChange={(e) => {
                  setLate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            {/**@TODO test subject will be automatically added  if any . and it will be rendered conditonally*/}
            <Form.Group className="mb-3" controlId="test score">
              <Form.Label>Test Score</Form.Label>
              <Form.Control
                value={testScore}
                onChange={(e) => {
                  setTestScore(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            {/**@TODO test subject will be automatically added  if any . and it will be rendered conditonally*/}
            <Form.Group className="mb-3" controlId="vivaanswered">
              <Form.Label>Viva Answered</Form.Label>
              <Form.Control
                value={vivaAnswered}
                onChange={(e) => {
                  setVivaAnswered(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Table className="mt-3" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Date</th>
            <th>Attandance</th>
            <th>H.W</th>
            <th>
              Late &nbsp;<i className="fas fa-clock"></i>
            </th>
            <th>Test Subject</th>
            <th>Test Marks</th>
            <th>Viva aksed</th>
            <th>Viva answered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/01/2022</td>
            <td>
              <i className="fas fa-check"></i>
            </td>
            <td>80%</td>
            <td>10</td>
            <td>
              <i className="fas fa-minus"></i>
            </td>
            <td>
              <i className="fas fa-minus"></i>
            </td>
            <td>5</td>
            <td>
              <i className="fas fa-times"></i>
            </td>
          </tr>
          <tr>
            <td>01/01/2022</td>
            <td>
              <i className="fas fa-check"></i>
            </td>
            <td>80%</td>
            <td>10</td>
            <td>Physics</td>
            <td>70</td>
            <td>
              <i className="fas fa-minus"></i>
            </td>
            <td>
              <i className="fas fa-minus"></i>
            </td>
          </tr>
          <tr>
            <td>01/01/2022</td>
            <td>
              <i className="fas fa-check"></i>
            </td>
            <td>80%</td>
            <td>10</td>
            <td>Physics</td>
            <td>
              <i className="fas fa-times"></i>
            </td>
            <td>
              <i className="fas fa-minus"></i>
            </td>
            <td>
              <i className="fas fa-minus"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Details;
