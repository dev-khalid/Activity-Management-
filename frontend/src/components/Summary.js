import React from 'react';
import { Badge, Button } from 'react-bootstrap';
const Summary = () => {
  return (
    <div>
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
      
    </div>
  );
};

export default Summary;
