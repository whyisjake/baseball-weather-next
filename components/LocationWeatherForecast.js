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
      <tr key={idx}>
        <td>
          <Skycons
            color="black"
            type={icon}
            animate={true}
            resizeClear={true}
          />
        </td>
        <td>{strDate}</td>
        <td>{chance}</td>
        <td>
          {temperatureHigh}°F / {temperatureLow}°F
        </td>
      </tr>
    );
  });

  return (
    <div className="card">
      <div className="card-header">7-Day Forecast</div>
      <div className="card-body">
        <table className="table table-striped table-centered table-no-border-top">
          <thead>
            <tr>
              <th></th>
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