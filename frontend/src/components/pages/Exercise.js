import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
const Data = [
  {
    _id: '621860c5c3dd538fe9b5291e',
    date: '2022-02-24T04:52:15.000Z',
    done: false,
    description: '21 day fitness challenge',
    userId: '11XWcMJ3cQdFy5U2zODmAAawWCm1',
    timeOfExercise: 10,
    __v: 0,
  },
  {
    _id: '621860c5c3dd538fe9b5291e',
    date: '2022-02-23T04:52:15.000Z',
    done: false,
    description: '21 day fitness challenge',
    userId: '11XWcMJ3cQdFy5U2zODmAAawWCm1',
    timeOfExercise: 10,
    __v: 0,
  },
  {
    _id: '621860c5c3dd538fe9b5291e',
    date: '2022-02-22T04:52:15.000Z',
    done: false,
    description: '21 day fitness challenge',
    userId: '11XWcMJ3cQdFy5U2zODmAAawWCm1',
    timeOfExercise: 10,
    __v: 0,
  },
  {
    _id: '621860c5c3dd538fe9b5291e',
    date: '2022-02-21T04:52:15.000Z',
    done: false,
    description: '21 day fitness challenge',
    userId: '11XWcMJ3cQdFy5U2zODmAAawWCm1',
    timeOfExercise: 10,
    __v: 0,
  },
  {
    _id: '621860c5c3dd538fe9b5291e',
    date: '2022-02-20T04:52:15.000Z',
    done: false,
    description: '21 day fitness challenge',
    userId: '11XWcMJ3cQdFy5U2zODmAAawWCm1',
    timeOfExercise: 10,
    __v: 0,
  },
];

const Exercise = () => {
  const [done, setDone] = useState(true);
  const [show, setShow] = useState(false);
  const [timeOfExercise, setTimeOfExercise] = useState();
  const [description, setDescription] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [value, setValue] = useState(new Date());
  const [exerciseData, setExerciseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    const monthlyData = async () => {
      setLoading(true);
      const date = new Date().toISOString();

      const { data } = await axios.get(
        `/api/exercise/${currentUser.uid}/${date}`
      );
      setExerciseData(data);
      setLoading(false);
    };
    monthlyData();
  }, []);

  function tileClassName({ date }) {
    if (
      exerciseData.find(
        (d) =>
          moment(d.date).format('DD-MM-YYYY') ===
          moment(date).format('DD-MM-YYYY')
      )
    )
      return 'bg-success text-light';
  }
  function onClickDay({ value, event }) {
    //on click this a modal should appear and it should take care of all of that thing about posting . or updating . or description timing issue
    setShow(true);
  }

  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    const createExercise = async () => {
      const { data } = await axios.post('/api/exercise', {
        value,
        userId: currentUser.uid,
        timeOfExercise,
        description,
        done,
        date: value,
      });
      setLoading(false);
      setShow(false);
    };
    createExercise();
  }
  return (
    <div>
      {loading && (
        <span>
          Loading data ... <Spinner animation="border" />
        </span>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Exercise : {moment(value).format('D dddd MMM yyyy')}{' '}
            {console.log('submit er por loading er value ki', loading)}
            {loading && <Spinner animation="border" />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description of your exercise</Form.Label>
              <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="timeofexercise">
              <Form.Label>Time of Exercise </Form.Label>
              <Form.Control type="number" placeholder="Enter time" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="done">
              <Form.Check
                type="checkbox"
                label="Have you done your exerise ? "
                checked={done}
                onChange={(e) => {
                  setDone(e.target.checked);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Calendar
        value={value}
        onChange={(nextVal) => {
          console.log(nextVal);
          return setValue(nextVal);
        }}
        tileClassName={tileClassName}
        onClickDay={onClickDay}
      />
    </div>
  );
};

export default Exercise;
