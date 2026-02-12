import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import { useNext } from "@/components/helpers/_fetcher";
import _ from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Info(props) {
  const router = useRouter();
  let { field } = router.query;

  // Ensure that the field is set on the homepage.
  field = _.get(field, "[0]", "bancroft");

  // Get the forecast for the field.
  const { data, error } = useNext(field);

  if (error) return <p>Error</p>;
  if (!data) return <p></p>;
  if (data.forecastNextHour.minutes.length < 1) return <p></p>;

  // We want to have twelve labels.
  // One at 5m, 10m, 15m, ..., 60m.
  const labels = [
    "now",
    "5m",
    "10m",
    "15m",
    "20m",
    "25m",
    "30m",
    "35m",
    "40m",
    "45m",
    "50m",
    "55m",
  ];

  // Aggregate the data into 5-minute intervals.
  let chartActualData = [];
  for (let i = 0; i < 60; i += 5) {
    let sum = 0;
    for (let j = i; j < i + 5; j++) {
      sum += data.forecastNextHour.minutes[j].precipitationIntensity;
    }
    // Convert mm to inches.
    chartActualData.push((sum / 5) * 0.0393701);
  }

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Inches/Hour",
        data: chartActualData,
        borderColor: "rgb(33, 150, 243)",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Rain Probability",
      },
    },
  };

  // If it is not going to rain, return nothing.
  if (data.forecastNextHour.summary[0].precipitationChance === 0) {
    return <p></p>;
  }

  return (
    <div className="card-modern widget">
      <div className="bg-baseball-sky-500 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">
          Precipitation Intensity — Next Hour
        </h3>
      </div>
      <div className="p-6">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
