import React, { useEffect, useState } from 'react';
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

const MonthlyData = ({updateBarChart}) => {
  const { currentUser } = useAuth();
  let labels = [];
  const [monthlyData, setMonthlyData] = useState([]);
  useEffect(() => {
    const getMonthlyData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/study/monthlydata/${currentUser.uid}`
      );
      let monthlyDataCopy = [];
      data.forEach((d) => {
        const date = new Date(d.createdAt).getDate(); 
        monthlyDataCopy[date-1] = d.completed; 
      }); 
      setMonthlyData(monthlyDataCopy); 
    };
    getMonthlyData();
  }, [currentUser,updateBarChart]);
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

  return <Bar options={options} data={barData} />;
};

export default MonthlyData;
