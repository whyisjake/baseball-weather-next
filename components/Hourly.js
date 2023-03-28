import { useRouter } from "next/router";
import { useHourly } from "@/components/helpers/_fetcher";
import { weatherTypes } from "./_weatherTypes";
import { _get } from "lodash";
import Skycons from "react-skycons";

export default function Info(props) {
  const router = useRouter();
  let { field } = router.query;

  // Ensure that the field is set on the homepage.
  field = _.get(field, "[0]", "bancroft");

  // Get the forecast for the field.
  const { data, error } = useHourly(field);

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
      <tr key={idx}>
        <td>
          <Skycons
            color="black"
            type={icon}
            animate={true}
            resizeClear={true}
          />
        </td>
        <td>{strTime}</td>
        <td>{status}</td>
        <td>{temperature}°F</td>
      </tr>
    );
  });

  return (
    <div className="card">
      <div className="card-header">Hourly Forecast</div>
      <div className="card-body">
        <table className="table table-striped table-centered table-no-border-top">
          <thead>
            <tr>
              <th></th>
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
