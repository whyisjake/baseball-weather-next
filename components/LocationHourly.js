import { useLocationHourly } from "@/components/helpers/_fetcher";
import { weatherTypes } from "./_weatherTypes";
import _ from "lodash";
import Skycons from "react-skycons";

export default function LocationHourly({ lat, lng }) {
  // Get the forecast for the location.
  const { data, error } = useLocationHourly(lat, lng);

  if (error) return <p>Fetching data...</p>;
  if (!data) return <p></p>;

  // We have an array of 24 hours of data.
  // Each row of the table needs to have an icon, a hour time, a status, and a temperature.
  // We'll need to loop through the data and build a table row for each hour.
  let hourlyForecast = data.forecastHourly.hours.map((hour, idx) => {
    // Convert the time to a 12 hour format.
    // The format of this time is 2023-03-24T20:00:00Z
    let time = new Date(hour.forecastStart);
    let strTime = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    // Convert the temperature from celcius to fahrenheit.
    let temperature = Math.round((hour.temperature * 9) / 5 + 32);

    // Use a skycon for the icon.
    let icon = _.get(weatherTypes[hour.conditionCode], "icon", "CLEAR_DAY");

    // Update the status to use the better text.
    let status = _.get(weatherTypes[hour.conditionCode], "name", "Clear");

    // if we have a precipitation chance, add it to the status.
    if (hour.precipitationChance > 0) {
      status += ` (${Math.round(hour.precipitationChance * 100)}%)`;
      status += ` ${
        Math.round(hour.precipitationAmount * 0.0393701 * 100) / 100
      }"`;
    }

    return (
      <tr key={idx} className="hover:bg-baseball-green-50/30 transition-colors">
        <td className="w-16">
          <div className="flex justify-center">
            <Skycons
              color="#6B7280"
              type={icon}
              animate={true}
              resizeClear={true}
            />
          </div>
        </td>
        <td className="font-medium text-gray-900 dark:text-gray-100">{strTime}</td>
        <td className="text-gray-700 dark:text-gray-300">{status}</td>
        <td className="font-semibold text-baseball-clay-600">{temperature}°F</td>
      </tr>
    );
  });

  return (
    <div className="card-modern widget">
      <div className="bg-baseball-sky-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Hourly Forecast</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table-modern table-hover">
          <thead>
            <tr>
              <th className="w-16">Icon</th>
              <th>Time</th>
              <th>Status</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>{hourlyForecast}</tbody>
        </table>
      </div>
    </div>
  );
}