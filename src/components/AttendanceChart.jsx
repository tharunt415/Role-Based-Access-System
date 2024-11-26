import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AttendanceChart = () => {
  // Data for the chart
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Days of the week
    datasets: [
      {
        label: 'Present',
        data: [8, 9, 12, 10, 11], // Attendance data for "Present"
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.1)', // Green with transparency
        tension: 0.4, // Smooth lines
        fill: true,
      },
      {
        label: 'Late',
        data: [1, 2, 1, 0, 2], // Attendance data for "Late"
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.1)', // Orange with transparency
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Absent',
        data: [2, 1, 0, 2, 1], // Attendance data for "Absent"
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Red with transparency
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Adjust chart size to fit container
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          // Custom tooltip to display better labels
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis at 0
        ticks: {
          stepSize: 1, // Interval for ticks
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Weekly Attendance Trend</h2>
      <div style={{ height: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceChart;
