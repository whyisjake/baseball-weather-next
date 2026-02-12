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
import { useLocationNext } from "@/components/helpers/_fetcher";

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

export default function LocationNext({ lat, lng }) {
  // Get the forecast for the location.
  const { data, error } = useLocationNext(lat, lng);

  if (error) return <p>Error</p>;
  if (!data) return <p></p>;
  if (data.forecastNextHour.minutes.length < 1) return <p></p>;

  // We have an array of precipitation data for the next hour.
  // Each minute has a precipitation chance.
  // We'll need to loop through the data and build a chart.

  let labels = data.forecastNextHour.minutes.map((minute, idx) => {
    let time = new Date(minute.startTime);
    let strTime = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return strTime;
  });

  // Convert the precipitation amount from millimeters to inches.
  let precipitationData = data.forecastNextHour.minutes.map(
    (minute) => minute.precipitationIntensity * 0.0393701
  );

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Precipitation (inches)",
        data: precipitationData,
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
        display: true,
        text: "Precipitation for the Next Hour",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Precipitation (inches)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  return (
    <div className="card-modern widget">
      <div className="bg-baseball-sky-500 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Next Hour Precipitation</h3>
      </div>
      <div className="p-6">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}