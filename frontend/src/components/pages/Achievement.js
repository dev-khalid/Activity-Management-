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
import PaginationComponent from '../PaginationComponent';

const Achievement = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState(new Date().toISOString().split('T')[0]);
  const [searchTitle, setSearchTitle] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const getAchievements = async (userId) => {
    setLoading(true);
    const api =
      from !== ''
        ? `api/achievement/data/${page}/${userId}?from=${from}&to=${to}&title=${searchTitle}`
        : `api/achievement/data/${page}/${userId}?title=${searchTitle}`;
    const { data } = await axios.get(api);
    setAchievements(data);
    setLoading(false);
  };
  useEffect(() => {
    getAchievements(currentUser.uid);
  }, [currentUser.uid, page]);
  const submitHandler = (e) => {
    e.preventDefault();
    getAchievements(currentUser.uid);
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
                  {loading && (
                    <tr>
                      <td colSpan={4}>
                        <strong>Loading...</strong>
                      </td>
                    </tr>
                  )}
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
        <PaginationComponent
          activePage={page}
          fetchFrom={'achievement'}
          setPage={setPage}
          userId={currentUser.uid}
        />
      </Container>
    </div>
  );
};

export default Achievement;
