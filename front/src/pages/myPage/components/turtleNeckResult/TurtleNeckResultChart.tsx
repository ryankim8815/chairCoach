import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TurtleNeckResultProps } from "./TurtleNeckResult";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: 60,
          yMax: 60,
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        },
      },
    },
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "TurtleNeck Result",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        //color: "#E3E3E3",
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        //color: "#E3E3E3",
      },
      ticks: {
        display: false,
        minRotation: 90,
      },
      border: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: "단위: 점",
      // },
    },
  },
};

//const yearArr = Object.keys(koreaData).map((item) => Number(item) + 1990);

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

const chartData = {
  labels: month,
  datasets: [
    {
      label: "평균 점수",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "#835DFE",
      borderColor: "#835DFE",
      borderWidth: 1,
    },
  ],
};

function TurtleNeckResultChart({ data }: TurtleNeckResultProps) {
  chartData.datasets[0].data = data!;
  return (
    <Container>
      <Line options={options} data={chartData} />
    </Container>
  );
}

export default TurtleNeckResultChart;

const Container = styled.div`
  width: 755px;
  height: 200px;
  & > canvas {
    width: 100%;
    margin: 0 auto;
  }
`;
