import React, { useState, useeffect, useEffect } from 'react';
import { Table, Badge, Button, Form, Modal, Spinner } from 'react-bootstrap';
import StudentInfo from '../StudentInfo';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ActivitySummary from '../ActivitySummary';
import { useAuth } from '../../contexts/AuthContext';

const Details = () => {
  const { currentUser } = useAuth();
  const { state } = useLocation();
  const { studentId, month, name } = state;
  const [basicConfig, setBasicConfig] = useState('');
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [date, setDate] = useState({});
  const [show, setShow] = useState(false);
  const [attandance, setAttandance] = useState(true);
  const [homework, setHomeWork] = useState(0);
  const [late, setLate] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [vivaAnswered, setVivaAnswered] = useState(0);
  const [activityData, setActivityData] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [noConfig, setNoConfig] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getBasicConfig = async () => {
    setLoadingConfig(true);
    const currentDate = `${new Date().toISOString().split('T')[0]}`;
    const { data } = await axios.get(`api/student/basicconfig/${currentDate}`);
    setBasicConfig(data);
    if (data) {
      setNoConfig(false);
    } else {
      setNoConfig(true);
    }
    setLoadingConfig(false);
  };
  const getStudentActivityData = async () => {
    setLoadingActivity(true);
    const { data } = await axios.get(
      `api/student/studentactivity/${studentId}/${month}`
    );
    setActivityData(data.activityData);
    setLoadingActivity(false);
  };
  useEffect(() => {
    getStudentActivityData();
    getBasicConfig();
  }, [studentId, month]);

  const submitHandler = (e) => {
    e.preventDefault();
    const addData = async () => {
      await axios.post('api/student/studentactivity', {
        date,
        studentId,
        attandance,
        homework,
        late,
        vivaAnswered,
        testScore,
      });
    };
    addData();
    getStudentActivityData();
  };
  return (
    <>
      <StudentInfo studentId={studentId} month={month} />
      {loadingActivity ? (
        <div>
          Loading Statistics...
          <Spinner animation="border" />
        </div>
      ) : (
        <ActivitySummary activityData={activityData} />
      )}
      <Button className="mt-3">Download Statistics</Button>
      {/**@TODO this section is only for admin */}

      {currentUser && currentUser.uid == process.env.REACT_APP_ADMIN && (
        <Button className="mt-3 mx-3 " disabled={noConfig} onClick={handleShow}>
          Add Todays Data
        </Button>
      )}
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
                <option value={true}>{`???`}</option>
                <option value={false}>{`???`}</option>
              </Form.Select>
            </Form.Group>
            {/**@TODO homwwork conditionally render korte hobe. */}
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
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

      <Table className="mt-3 text-center" striped bordered hover variant="dark">
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
            <th>Viva</th>
          </tr>
        </thead>
        <tbody>
          {loadingActivity && (
            <tr>
              <td colSpan={7}>
                <Spinner animation="border" />
                Loading...
              </td>
            </tr>
          )}

          {!loadingActivity && activityData.length > 0 ? (
            activityData.map((record, id) => (
              <tr key={id}>
                <td>{new Date(record.createdAt).toDateString()}</td>
                <td>
                  <i
                    className={
                      record.attandance ? `fas fa-check` : 'fas fa-times'
                    }
                  ></i>
                </td>
                <td>{record.homework}</td>
                <td>{record.late}</td>
                <td>
                  {record.testSubject === 0 ? (
                    <i className="fas fa-minus"></i>
                  ) : (
                    <span>{record.testSubject}</span>
                  )}
                </td>
                <td>
                  {record.testFullMark === 0 ? (
                    <i className="fas fa-minus"></i>
                  ) : (
                    <span>
                      {record.testScore}/{record.testFullMark}
                    </span>
                  )}
                </td>
                <td>
                  {record.vivaAsked == 0 ? (
                    <i className="fas fa-minus"></i>
                  ) : (
                    <span>
                      {record.vivaAnswered}/{record.vivaAsked}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Details;
