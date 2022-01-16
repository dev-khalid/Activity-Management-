import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Row,
  Container,
  Col,
  Card,
  Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext';
import PaginationComponent from '../PaginationComponent';

const Target = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [page, setPage] = useState(1);
  const [onUpdate, setOnUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [updatingTarget, setUpdatingTarget] = useState({});

  const [targets, setTargets] = useState([]);
  // const numberOfTargets = useMemo(() => {
  //   const calc = async () => {
  //     const { data } = await axios.get(`api/target/${userId}`);
  //   };
  // }, []);
  const getAllTargets = async (page, userId) => {
    setLoading(true);
    const { data } = await axios.get(`api/target/${page}/${userId}`);
    setLoading(false);
    setTargets(data);
  };

  useEffect(() => {
    getAllTargets(page, currentUser.uid);
  }, [page, currentUser.uid]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = (e) => {
    e.preventDefault();
    if (onUpdate) {
      const updateData = async () => {
        await axios.patch('api/target', {
          _id: updatingTarget._id,
          title,
          deadline,
        });
        setOnUpdate(false);
        getAllTargets(page, currentUser.uid);
      };
      updateData();
    } else {
      const createTarget = async () => {
        await axios.post('api/target', {
          userId: currentUser.uid,
          title,
          deadline,
        });
        getAllTargets(page, currentUser.uid);
      };
      createTarget();
    }
    setTitle('');
    setDeadline('');
  };
  const updateHandler = (target) => {
    setShow(true);
    setTitle(target.title);
    setDeadline(new Date(`${target.deadline}`).toISOString().split('T')[0]);
    setOnUpdate(true);
    setUpdatingTarget(target);
  };
  const deleteHandler = (target) => {
    if (window.confirm('Are you sure  want to delete this')) {
      const deleteData = async () => {
        await axios.delete(`api/target/${target._id}`);
        getAllTargets(page, currentUser.uid);
      };
      deleteData();
    } else {
      console.log('Denied');
    }
  };

  const completeHandler = (target) => {
    if (window.confirm('Have you completed your task? ')) {
      const completedTask = async () => {
        await axios.patch('api/target', {
          _id: target._id,
          accomplished: true,
        });
      };
      completedTask();
      toast('Congratulations you Have completed your target 🚀');
      getAllTargets(page, currentUser.uid);
    } else {
      console.log('Denied');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Your Target
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Target</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Title of Your Target: <i className="fas fa-pen-fancy"></i>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDeadline">
              <Form.Label>
                Set Deadline: <i className="far fa-clock"></i>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Title"
                value={deadline}
                autoComplete="on"
                onChange={(e) => setDeadline(e.target.value)}
              />
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

      <ToastContainer />
      {/* infinite scroll er moddhe ami data take anbo chunk by chunk kivabe ?   */}
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
      {!loading && targets.length > 0 ? (
        <Container>
          <Row className="py-3">
            {targets.map((target, id) => (
              <Col key={id} className="py-3" xs={6} md={4} lg={3} xl={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>{target.title}</Card.Title>
                    <Card.Text>
                      Deadline:{' '}
                      <strong
                        className={
                          new Date().toDateString() >
                          new Date(target.deadline).toDateString()
                            ? 'text-danger'
                            : 'text-success'
                        }
                      >
                        {new Date(target.deadline).toDateString()}
                      </strong>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => completeHandler(target)}
                    >
                      <i className="fas fa-check"></i>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => updateHandler(target)}
                      style={{
                        marginLeft: '15px',
                        marginRight: '15px',
                      }}
                    >
                      <i className="fas fa-pen"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(target)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </Card.Body>
                </Card>{' '}
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h3>It might take few seconds to load data if any data is there. </h3>
      )}
      <PaginationComponent
        activePage={page}
        fetchFrom={'target'}
        setPage={setPage}
        userId={currentUser.uid}
      />
    </>
  );
};

export default Target;
