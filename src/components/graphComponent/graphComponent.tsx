import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "../../app/reducer/hook";
import "./graphComponent.scss";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels
);

type chartProp = {
  labels: any;
  plots: any;
};

const GraphComponent = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const { chart } = useAppSelector((state) => state.weather);
  const labels = [...chart.labels, ""];

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          data: chart.plots,
          fill: true,
          borderColor: "#7CC9F2",
          backgroundColor: "#7CC9F2",
          borderWidth: 0,
        },
      ],
    });
  }, [chart]);

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "#9A9A9A",
        font: {
          family: "Poppins",
          size: 12,
        },
        formatter: function (value) {
          return Math.round(value) + "C";
        },
        align: 350,
        offset: 1,
      },
      legend: { display: false },
      tooltip: {
        displayColors: false,
        bodyFontSize: 14,
        xPadding: 10,
        yPadding: 10,
        cornerRadius: 10,
        enabled: true,
        intersect: true,
        callbacks: {
          label: function (context) {
            return context.parsed.y + " C";
          },
          title: function () {
            return "";
          },
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export { GraphComponent };
