import React, { useState } from 'react';
import { Button, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getNumberOfDaysInMonth from '../../helpers/getNumberOfDaysInMonth';
import getMonthName from '../../helpers/getMonthName';

const Home = () => {
  const [show, setShow] = useState(false);
  const [targetHour, setTargetHour] = useState(0);
  const [hasTarget, setHasTarget] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [currentStudiedHours, setCurrentStudiedHours] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO: jokhon from ta submit hobe tokhn eikhan theke ekta api request jabe backend end onkgula object soho jemon -> hour , date , userId
    if (targetHour > 0 && targetHour < 24) setHasTarget(true);
    else {
      setHasTarget(false);
      setTargetHour(0);
    }
    console.log(targetHour);
  };
  const updateHandler = (e) => {
    e.preventDefault();
    if (targetHour > 0 && targetHour < 24) setHasTarget(true);
    else {
      setHasTarget(false);
      setTargetHour(0);
    }
    console.log(targetHour);
  };
  const currentStudiedHourHandler = (e) => {
    e.preventDefault();

    setCompleted(
      (prevComplete) => parseInt(prevComplete) + parseInt(currentStudiedHours)
    );
    console.log(targetHour, completed, currentStudiedHours);
    setCurrentStudiedHours(0);
  };

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );
  const pieData = {
    labels: ['Completed', 'Not Completed'],
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Study Hour Statistics of ' + getMonthName(),
      },
    },
  };
  let labels = [];
  let monthlyData = [];

  for (let i = 1; i <= getNumberOfDaysInMonth(); i++) {
    labels.push(i + '');
    monthlyData.push(0);
  }
  monthlyData[new Date().getDate() - 1] = completed;

  const barData = {
    labels,
    datasets: [
      {
        label: 'Study Hour Count',
        data: monthlyData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Container className="py-3">
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
              <Col>
                <h3>
                  <i className="fas fa-bullseye"></i> Target of{' '}
                  {new Date().toDateString()} : <i className="far fa-clock"></i>
                  &nbsp;{targetHour} Hours
                </h3>{' '}
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
                  <Form onSubmit={updateHandler}>
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
              <Col className="col-md-4">
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

      <Row>
        <Col className="py-3 col-5">
          <h3>Today's Statistics: {parseInt((completed/parseInt(targetHour))*100)}% Completed</h3>
          <Pie data={pieData} />
        </Col>
        <Col>
          <Bar options={options} data={barData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
//custom webpack setup
//custom babel setup
//custom eslint setup sikhte hobe .
