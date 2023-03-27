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
  field = field[0] || "bancroft";

  // Get the forecast for the field.
  const { data, error } = useNext(field);

  // For

  if (error) return <p>Error</p>;
  if (!data) return <p>Missing Data</p>;

  // const labels = data.forecastDaily.days.map((day) => day.date);
  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  // We want to have five labels.
  // One at 10m, 20m, 30m, 40m, 50m.
  // We can get the labels from the forecastNextHour.
  // Create an array of the labels.
  const labels = [];
  for (let index = 0; index < 60; index++) {
    if (index % 10 === 0 && index !== 0) {
      const element = data.forecastNextHour.minutes[index].startTime;
      labels.push(index + "m");
    } else {
      labels.push("");
    }
  }

  // Convert the start time to a date object.
  // These are in the forcastNextHour.minutes array.
  let chartActualData = [];
  for (let index = 0; index < 60; index++) {
    const element = data.forecastNextHour.minutes[index].precipitationIntensity;
    chartActualData.push(element);
  }

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Precipitation Intensity",
        data: chartActualData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
        display: true,
        text: "Rain Probability",
      },
    },
  };

  // If it is not going to rain, return nothing.
  if (data.forecastNextHour.summary[0].precipitationChance === 0) {
    return <p></p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
