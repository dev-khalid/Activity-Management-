import React, { useState, useEffect } from 'react';
import { Spinner, Badge } from 'react-bootstrap';

import axios from 'axios';
const StudentInfo = ({ studentId, month }) => {
  const [name, setName] = useState('');
  const [badge, setBadge] = useState('');
  const [loadingStudent, setLoadingStudent] = useState(false);

  const getStudentData = async () => {
    setLoadingStudent(true);
    const { data } = await axios.get(`api/student/data/${studentId}/${month}`);
    setName(data.name);
    setBadge(data.monthly[0].quality);
    setLoadingStudent(false);
  };

  useEffect(() => {
    getStudentData();
  }, [studentId, month]);
  return (
    <>
      {loadingStudent ? (
        <div>
          Loading Student Information ...
          <Spinner animation="border" />{' '}
        </div>
      ) : (
        <div>
          <h5>
            {' '}
            {name} Statistics for {month}
          </h5>
          <span>Payment Status: </span>
          <strong className="text-info">Paid</strong> <br />
          <span>Student Status: </span>
          <Badge variant="primary">{badge}</Badge>
          <br />
        </div>
      )}
    </>
  );
};

export default StudentInfo;
