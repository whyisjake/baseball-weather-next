import { useLocationForecast } from "@/components/helpers/_fetcher";
import { weatherTypes } from "./_weatherTypes";
import _ from "lodash";
import Skycons from "react-skycons";

export function LocationWeatherForecast({ lat, lng }) {
  // Get the forecast for the location.
  const { data, error } = useLocationForecast(lat, lng);

  if (error) return <p>No forecast data available</p>;
  if (!data) return <p></p>;

  // Build an array of the next seven days.
  let forecast = data.forecastDaily.days.map((day, idx) => {
    // Convert the date to a readable format.
    let date = new Date(day.forecastStart);
    let strDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    // Convert the temperature from celcius to fahrenheit.
    let temperatureHigh = Math.round((day.temperatureMax * 9) / 5 + 32);
    let temperatureLow = Math.round((day.temperatureMin * 9) / 5 + 32);

    // Build the skycon array.
    let skycon = weatherTypes[day.conditionCode];

    // Update the chance to use the better text.
    let chance = _.get(skycon, "name", "Clear");

    // if we have a precipitation chance, add it to the chance.
    if (day.precipitationChance > 0) {
      chance += ` (${Math.round(day.precipitationChance * 100)}%)`;
    }

    // Use a skycon for the icon.
    let icon = _.get(skycon, "icon", "CLEAR_DAY");

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
        <td className="font-medium text-gray-900 dark:text-gray-100">{strDate}</td>
        <td className="text-gray-700 dark:text-gray-300">{chance}</td>
        <td className="font-semibold text-baseball-clay-600 dark:text-baseball-clay-400">
          {temperatureHigh}°F / {temperatureLow}°F
        </td>
      </tr>
    );
  });

  return (
    <div className="card-modern widget">
      <div className="bg-baseball-green-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">7-Day Forecast</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table-modern table-hover">
          <thead>
            <tr>
              <th className="w-16">Icon</th>
              <th>Date</th>
              <th>Chance</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>{forecast}</tbody>
        </table>
      </div>
    </div>
  );
}

export default LocationWeatherForecast;