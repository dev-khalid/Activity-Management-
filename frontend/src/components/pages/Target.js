import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Row,
  Container,
  Col,
  Card,
} from 'react-bootstrap';
import axios from 'axios';
import data from '../../DevData/targetsArray';
const Target = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(null);

  /**FOLLOWING FUNCTIONALITY WILL BE AVAILABLE AFTER BACKEND IMPLEMENTATION 
   * ei total jinish take useTargets name ekta hook er moddhe diye dibo . 
   */
  const [targets, setTargets] = useState([]);
  useEffect(() => {
    const getAllTargets = async () => {
      const { data } = await axios.get('api/target/:pageNumber/:userId'); //we want to apply pagination also right ? so we need to fetch data by page number also .
      setTargets(data); //backend theke amra directly oi array of objects takei pathabo jeita data er moddhe thakbe so data theke kichui ar ber kore nite hobe na .
    };
    setTargets(data);
  }, []);
  /**END OF ABOVE FUNCTIONALITY */

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = (e) => {
    e.preventDefault();
    //here the api call should be made .
  };
  const updateHandler = (target) => {
    setTitle(target.title);
    setDeadline(target.deadline);
    setShow(true);
  };
  const deleteHandler = (trget) => {
    if (window.confirm('Are you sure  want to delete this')) {
      console.log('Data Deleted');
    } else {
      console.log('Denied');
    }
  };

  const completeHandler = (target) => {
    if (window.confirm('Have you completed your task? ')) {
      console.log('Task Completed');
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

      {/* infinite scroll er moddhe ami data take anbo chunk by chunk kivabe ?   */}
      {targets.length > 0 ? (
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
                          new Date().toDateString() > new Date(target.deadline)
                            ? 'text-danger'
                            : 'text-success'
                        }
                      >
                        {target.deadline}
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
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default Target;
