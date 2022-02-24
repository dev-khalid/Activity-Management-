import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
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
import getMonthName from '../helpers/getMonthName';
import getNumberOfDaysInMonth from '../helpers/getNumberOfDaysInMonth';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const MonthlyData = ({ updateBarChart }) => {
  const [totalHours, setTotalHours] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  let labels = [];
  const [monthlyData, setMonthlyData] = useState([]);
  useEffect(() => {
    const getMonthlyData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `/api/study/monthlydata/${currentUser.uid}`
      );
      let monthlyDataCopy = [];
      console.log(data);
      let h = 0;
      data.data.forEach((d) => {
        const date = new Date(d.createdAt).getDate();
        monthlyDataCopy[date - 1] = d.completed;
      });
      setMonthlyData(monthlyDataCopy);
      setTotalHours(data.hours);
      setLoading(false);
    };
    getMonthlyData();
  }, [currentUser, updateBarChart]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:
          'Statistics of ' + getMonthName() + ' ' + totalHours + ' Hours total',
      },
    },
  };

  for (let i = 1; i <= getNumberOfDaysInMonth(); i++) {
    labels.push(i + '');
  }

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
    <>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>{' '}
        </div>
      ) : (
        <Bar options={options} data={barData} />
      )}
    </>
  );
};

export default MonthlyData;
