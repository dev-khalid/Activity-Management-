import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const generateData = (till, obj) => {
  let data = [];
  for (let i = 0; i < till; i++) {
    data.push(Math.floor(Math.random() * (obj.max - obj.min)) + obj.min);
  }
  return data;
};
const Exercise = () => {
  const [series, setSeries] = useState([
    {
      name: 'Metric1',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric2',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric3',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric4',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric5',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric6',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric7',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric8',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric9',
      data: generateData(52, {
        min: 0,
        max: 90,
      }),
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#008FFB'],
    title: {
      text: 'HeatMap Chart (Single color)',
    },
  });
  return (
    <div>
      {' '} 
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          height={350} 
        /> 
    </div>
  );
};

export default Exercise;
