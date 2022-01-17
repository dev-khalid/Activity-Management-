import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
const Details = () => {
  return (
    <>
      <h5>Khalids Statistics for January - 2022</h5>
      <span>Payment Status: </span>
      <strong className="text-info">Paid</strong> <br />
      <span>Student Status: </span>
      <Badge variant="primary">Best</Badge> <br />
      <span>Average Late time:</span>{' '}
      <strong className="text-danger">5 mins</strong> <br />
      <span>Attandance Ratio: </span>
      <strong className="text-info">100%</strong>
      <br />
      <span>Home Work Done : </span>
      <strong className="text-info"> 82% </strong>
      <br />
      <span>Viva Performance: </span>
      <strong className="text-info">75%</strong> <br />
      <span>Test Score: </span>
      <strong className="text-primary">95%</strong> <br />
      <span>Test Taken: </span>
      <strong className="text-primary"> 10/10</strong> <br />
      <Button className="mt-3">Download Statistics</Button>
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
