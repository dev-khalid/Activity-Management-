import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';
import MonthlyData from '../MonthlyData';
import * as Push from 'push.js';

import '../../FirebaseConfiguration';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

const months = [
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

let years = [2021, 2022];

const Study = () => {
  //

  const [show, setShow] = useState(false); //this state is used for modal show
  const [targetHour, setTargetHour] = useState(0);
  const [hasTarget, setHasTarget] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [currentStudiedHours, setCurrentStudiedHours] = useState(0);
  const [updateBarChart, setUpdateBarchart] = useState(0);
  const [totalStudiedHoursOfCM, setTotalStudiedHoursOfCM] = useState(undefined);
  const { currentUser } = useAuth();
  const handleClose = () => setShow(false); //this state is used for modal
  const handleShow = () => setShow(true); //used for modal
  useEffect(() => {
    const todaysData = async () => {
      const { data } = await axios.get(
        `api/study/todaysdata/${currentUser.uid}`
      );
      if (data) {
        setHasTarget(true);
        setTargetHour(data.targetHour);
        setCompleted(data.completed);
      } else {
        Push.create('SetUp your todays target Hour!', {
          body: 'Setup and keep track of your progress.',
          icon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.subpng.com%2Fpng-ve630w%2F&psig=AOvVaw3FoQZxu7uWEqFOFvJRy_lR&ust=1641782695228000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjpzqjTo_UCFQAAAAAdAAAAABAD',
          onClick: function () {
            window.focus();
            this.close();
          },
        });
        toast('Hey Set Up Your Todays Target🚀', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHasTarget(false);
      }
    };
    todaysData();
  }, [currentUser]);
  // useEffect(() => {
  //   const totalStudiedHours = async () => {
  //     const { data } = await axios.get(
  //       `api/study/monthlyStudyHours/${
  //         new Date().getMonth() + 1
  //       }/${new Date().getFullYear()}/${currentUser.uid}`
  //     );
  //     setTotalStudiedHoursOfCM(data.hours);
  //   };
  //   totalStudiedHours();
  // }, [completed]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (targetHour > 0 && targetHour < 24) {
      const submitTarget = async () => {
        const { data } = await axios.post(`/api/study`, {
          userId: currentUser.uid,
          targetHour,
        });
        toast.info(targetHour + ' Hour Addedd!', {
          position: 'top-center',
          icon: '🚀',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHasTarget(true);
        setTargetHour(data.targetHour);
        setCompleted(data.completed);
      };
      submitTarget();
    } else {
      setHasTarget(false);
      setTargetHour(0);
    }
  };
  const updateTargetHandler = (e) => {
    e.preventDefault();
    if (targetHour > 0 && targetHour < 24) {
      const updateTarget = async () => {
        const { data } = await axios.patch('api/study/target', {
          userId: currentUser.uid,
          targetHour,
        });
        toast(targetHour + ' Hour Updated!', {
          position: 'top-center',
          autoClose: 5000,
          icon: '🚀',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHasTarget(true);
        setTargetHour(data.targetHour);
      };
      updateTarget();
    } else {
      setHasTarget(false);
      setTargetHour(0);
    }
  };
  const currentStudiedHourHandler = (e) => {
    e.preventDefault();
    if (
      parseInt(completed) + parseInt(currentStudiedHours) >
      parseInt(targetHour)
    ) {
      toast.warn(
        'Your completed hours exceeds target hour. Please update target hours first.'
      );
    } else {
      const updateCompleted = async () => {
        const { data } = await axios.patch('api/study/completed', {
          userId: currentUser.uid,
          completed: parseInt(completed) + parseInt(currentStudiedHours),
        });
        toast(currentStudiedHours + ' Hour Added!', {
          position: 'top-center',
          icon: '🚀',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCompleted(data.completed);
        setCurrentStudiedHours(0);
        setUpdateBarchart(updateBarChart + 1);
      };
      updateCompleted();
    }
  };

  const pieData = {
    labels: ['Completed Hours', 'Not Completed Hours'],
    datasets: [
      {
        label: 'Study Hour Statiscitcs',
        data: [completed, targetHour - completed],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="py-3">
      {totalStudiedHoursOfCM && (
        <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Total Studied Hours of {months[Number(new Date().getMonth())]} -{' '}
          {totalStudiedHoursOfCM} Hours
        </h5>
      )}
      <Row>
        {!hasTarget ? (
          <Col>
            <Button variant="primary" onClick={handleShow}>
              Set Up target For Today <i className="far fa-clock"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Set Up target For Today{' '}
                  <i className="fas fa-clipboard-check"></i>
                </Modal.Title>
              </Modal.Header>
              <Form onSubmit={submitHandler}>
                <Modal.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Target Hour <i className="far fa-clock"></i>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Target Hour"
                      onChange={(e) => setTargetHour(e.target.value)}
                    />
                    <Form.Text>
                      Try to set It at your max level.
                      <i className="fas fa-fire"></i>
                      <i className="fas fa-fire"></i>
                      <i className="fas fa-fire"></i>
                    </Form.Text>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Col>
        ) : (
          <>
            <Row>
              <Col xs={12} sm={12} md={8}>
                <h5>
                  <i className="fas fa-bullseye"></i> Target of{' '}
                  {new Date().toDateString()} : <i className="far fa-clock"></i>
                  &nbsp;{targetHour} Hours
                </h5>{' '}
                <Button variant="primary" onClick={handleShow}>
                  Update Today's Target <i className="far fa-clock"></i>
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Set Up target For Today{' '}
                      <i className="fas fa-clipboard-check"></i>
                    </Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={updateTargetHandler}>
                    <Modal.Body>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                          Target Hour <i className="far fa-clock"></i>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Target Hour"
                          value={targetHour}
                          onChange={(e) => setTargetHour(e.target.value)}
                        />
                        <Form.Text>
                          Try to set It at your max level.
                          <i className="fas fa-fire"></i>
                          <i className="fas fa-fire"></i>
                          <i className="fas fa-fire"></i>
                        </Form.Text>
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleClose}
                      >
                        Update
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </Col>
              <Col xs={12} sm={12} md={4} className="col-md-4">
                <Form onSubmit={currentStudiedHourHandler}>
                  <Form.Group className="mb-3" controlId="formBasicHour">
                    <Form.Label>Enter Hours</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter hours"
                      value={currentStudiedHours}
                      onChange={(e) => setCurrentStudiedHours(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Please enter how much hours you have studied . it will
                      automatically sum up with previous study hours.
                    </Form.Text>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Add
                  </Button>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </Row>

      <Row className="py-3">
        <Col md={6} xl={6} sm={12} xs={12}>
          <h5>
            Today's Statistics:{' '}
            {!parseInt((completed / parseInt(targetHour)) * 100)
              ? '0'
              : parseInt((completed / parseInt(targetHour)) * 100)}
            % Completed
          </h5>

          <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div
            style={{
              height: '250px',
              width: '250px',
              paddingTop: '20px',
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            <Pie data={pieData} />
          </div>
        </Col>
        <Col md={6} xl={6} sm={12} xs={12}>
          <MonthlyData updateBarChart={updateBarChart} />
        </Col>
      </Row>
    </Container>
  );
};

export default Study;
/**
   * 
   * @TODO 
   * targetHour, completed - componenet did mount er sathe backend theke ene felte hobe and sei onujayi data gula nice dynamically update hobe . dynamic update er system kora ache ekhon sudhu backend a setup kora and eikhane frontend a api diye call korar system ta baki ache . 
   * 
   * 
   * targetHour,completed - componenetUpdate er sathe sathe again backend a send kore frontend a api call kore ante hobe . 
   * 
   * 
   * 
   * 
   *   //montly data take obossoi backend theke surtei load kore nite hobe . 
  //then targetHour, completed ei dutar jekono ekta state change holeu again backend a request pathiye oigulake monthly er hisabe update kore then response ene update kora lagbe . 
   */
