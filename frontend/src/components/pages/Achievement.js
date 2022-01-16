import React, { useState, useEffect } from 'react';
import {
  Row,
  Container,
  Col,
  Form,
  Button,
  InputGroup,
  Table,
  Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Achievement = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState(new Date().toISOString().split('T')[0]);
  const [searchTitle, setSearchTitle] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const getAchievements = async (userId) => {
    //ekhane amader jinish gula sob build up kore kore bar bar backend a request korte hobe.
    const api =
      from !== ''
        ? `api/achievement/${page}/${userId}?from=${from}&to=${to}&title=${searchTitle}`
        : `api/achievement/${page}/${userId}`;
    console.log('frontend', api);
    const { data } = await axios.get(api);
    console.log(data);
    setAchievements(data);
    setLoading(false);
  };
  useEffect(() => {
    getAchievements(currentUser.uid);
    console.log(achievements);
  }, [currentUser.uid, page]);
  const submitHandler = (e) => {
    e.preventDefault();

    //here goes the backend api call
  };

  return (
    <div>
      <Container>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={2} md={2} lg={2}>
              <h4>Achievement:</h4>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="from-date">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={from}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFrom(e.target.value);
                    }}
                    autoComplete="on"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="from-date">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2">To</InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={to}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTo(e.target.value);
                    }}
                    autoComplete="on"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="from-date">
                <Form.Control
                  type="test"
                  placeholder="Enter Title To Search"
                  value={searchTitle}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSearchTitle(e.target.value);
                  }}
                  autoComplete="on"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>

        <strong className="text-info ">
          <i>By default it will show previous 30 days Achievements.</i>
        </strong>

        <div className="py-3">
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
          <Table striped bordered hover variant="primary">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Deadline</th>
                <th>Completion Date</th>
              </tr>
            </thead>
            <tbody>
              {!loading && achievements.length > 0 ? (
                <>
                  {achievements.map((achievement, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{achievement.title}</td>
                      <td>{new Date(achievement.deadline).toDateString()}</td>
                      <td>{new Date(achievement.updatedAt).toDateString()}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {loading && <h5>Loading...</h5>}
                  {!loading && achievements.length === 0 && (
                    <tr>
                      <td colSpan={4}>No Data Found</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Achievement;
