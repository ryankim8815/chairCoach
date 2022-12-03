import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  maxBarThickness: 10,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "My Chair Report",
      font: {
        size: 14,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        //lineWidth: 10,
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};

const month = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
const day = ["월", "화", "수", "목", "금", "토", "일"];

const data = {
  labels: month,
  datasets: [
    {
      backgroundColor: "#835DFE",
      data: [100, 200, 300, 200, 30, 380, 270, 20, 120, 100, 50, 70],
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const MyChairReportChart = () => {
  return (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  );
};

export default MyChairReportChart;

const Container = styled.div`
  width: 755px;
  height: 200px;
  & > canvas {
    width: 100%;
    margin: 0 auto;
  }
`;
