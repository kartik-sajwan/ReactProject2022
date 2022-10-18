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
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import "./graphComponent.scss";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { updateChart } from "../../app/reducer/favouriteSlice";

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

type graphProps = {
  cityName: String
};

const GraphComponent : React.FC<graphProps> =  ({cityName}) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const { chart } = useAppSelector((state) => state.weather);
  const labels = [...chart.labels, ""];
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState("");

    useEffect(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=34e0733052ac7efacd645cd60b0fc116&units=metric`
        )
        .then(
          (response) => {
  
            if (response.data) {
              const data: number[] = [];
              const label: string[] = [];
              response.data.list?.filter((val) => {
                if (val.dt_txt?.includes("12:00:00")) {
                  data.push(val.main?.temp);
                  label.push(val.dt_txt?.slice(8, 10));
                }
              });
              label.push("")
              setChartData({
                labels: label,
                datasets: [
                  {
                    data: data,
                    fill: true,
                    borderColor: "#7CC9F2",
                    backgroundColor: "#7CC9F2",
                    borderWidth: 0,
                  },
                ],
              });
            }
          },
          (error) => {
            setApiError(error.response.data.message);
          }
        );
    }, []);
  

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
