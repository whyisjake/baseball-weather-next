import { useForecast } from "@/components/helpers/_fetcher";
import { useRouter } from "next/router";
import { weatherTypes } from "./_weatherTypes";
import _ from "lodash";
import Skycons from "react-skycons";

export function WeatherForecast() {
  const router = useRouter();
  let { field } = router.query;

  // Ensure that the field is set on the homepage.
  field = _.get(field, "[0]", "bancroft");

  // Get the forecast for the field.
  const { data, error } = useForecast(field);

  if (error) return <p>No field found</p>;
  if (!data) return <p></p>;

  // Build an array of the next seven days.
  let days = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000));
  }

  let conditions = [];
  for (let i = 0; i < 7; i++) {
    // Get the precipitationChance
    let skycon = weatherTypes[data.forecastDaily.days[i].conditionCode];
    let precipitationChance = data.forecastDaily.days[i].precipitationChance;
    let precipitationAmount = data.forecastDaily.days[i].precipitationAmount;

    // Precipitation amount is in mm, let's change that to inches.
    precipitationAmount = precipitationAmount * 0.0393701;

    // Let's change the amount to only two decimal places.
    precipitationAmount = Math.round(precipitationAmount * 100) / 100;

    // Precipitation chance is a percentage, so we need to multiply by 100.
    precipitationChance = Math.round(precipitationChance * 100);

    // let chance = `${data.forecastDaily.days[i].conditionCode}`;
    let chance = _.get(skycon, "name", "Clear");

    if (precipitationChance > 0) {
      chance += ` (${precipitationChance}%)`;
      chance += ` ${precipitationAmount}"`;
    }

    let icon = _.get(skycon, "icon", "CLEAR_DAY");

    // Let's get the temperature for the day.
    let { temperatureMax, temperatureMin } = data.forecastDaily.days[i];

    // Temperature is in Celcius, let's change that to Fahrenheit.
    temperatureMax = Math.round((temperatureMax * 9) / 5 + 32);
    temperatureMin = Math.round((temperatureMin * 9) / 5 + 32);

    conditions.push({ chance, icon, temperatureMax, temperatureMin });
  }

  // Return a table with seven columns.
  return (
    <div className="card-modern widget">
      <div className="bg-baseball-green-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Weather Forecast</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table-modern table-responsive">
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day} className="whitespace-nowrap">
                  {day.toLocaleDateString("en-US", { weekday: "long" })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {conditions.map((condition, idx) => (
                <td key={idx} className="align-top">
                  <div className="flex flex-col items-center py-4">
                    <Skycons
                      color="#6B7280"
                      type={condition.icon}
                      animate={true}
                      resizeClear={true}
                    />
                    <div className="mt-3 text-sm text-center space-y-1">
                      <div className="font-semibold text-baseball-clay-600 dark:text-baseball-clay-400">
                        {condition.temperatureMax}°F
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {condition.temperatureMin}°F
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 text-xs">
                        {condition.chance}
                      </div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 text-center text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        Weather data provided by{" "}
        <a
          href="https://weather-data.apple.com/legal-attribution.html"
          className="text-baseball-sky-600 hover:text-baseball-sky-700 dark:text-baseball-sky-400 dark:hover:text-baseball-sky-300 transition-colors"
        >
          Apple WeatherKit
        </a>
      </div>
    </div>
  );
}

export function GoogleMap(props) {
  let { lat, lng } = props;

  // Build the query string for the iframe.
  let queryString = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&layer=s&maptype=satellite`;
  return <iframe width="100%" height="300" src={queryString}></iframe>;
}
