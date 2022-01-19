import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
const BasicConfiguration = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [date, setDate] = useState('');
  const [testFullMark, setTestFullMark] = useState(0);
  const [testSubject, setTestSubject] = useState('None');
  const [vivaAsked, setVivaAsked] = useState(0);
  const [homeworkGiven, setHomeWorkGiven] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    const basicConfig = async () => {
      await axios.post('api/student/basicconfig', {
        date,
        homeworkGiven,
        vivaAsked,
        testFullMark,
        testSubject,
      });
    };
    basicConfig();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Basic Configuration for Today
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Date: {new Date().toDateString()}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>To Be Executed on: </Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Homework Given</Form.Label>
              <Form.Select onChange={(e) => setHomeWorkGiven(e.target.value)}>
                {' '}
                <option value={true}>{`✔`}</option>
                <option value={false}>{`❌`}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Viva Asked Questions</Form.Label>
              <Form.Control
                onChange={(e) => setVivaAsked(e.target.value)}
                value={vivaAsked}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Test Fullmark</Form.Label>
              <Form.Control
                onChange={(e) => setTestFullMark(e.target.value)}
                value={testFullMark}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Test Subject</Form.Label>
              <Form.Select onChange={(e) => setTestSubject(e.target.value)}>
                {testFullMark === 0 && (
                  <option value={testSubject}>None</option>
                )}
                {testFullMark !== 0 && (
                  <>
                    <option value="Physics">Physics</option>
                    <option value="Math">Math</option>
                    <option value="Ict">Ict</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default BasicConfiguration;
