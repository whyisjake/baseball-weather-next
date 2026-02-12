import { getWeatherDetails } from "@/pages/api/_helpers";
import { Wind, Thermometer, Sun, Clouds } from "react-bootstrap-icons";

export function WeatherDetails(props) {
  let currentWeather = props.currentWeather;

  let { windSpeed, windDirectionText, temperature, uvIndex, cloudCover } =
    getWeatherDetails(currentWeather);

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700" id="weatherDetails">
      <li className="px-6 py-3 flex items-center gap-3">
        <Thermometer className="w-5 h-5 text-baseball-clay-600" />
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100" id="temperature">
          {temperature}
        </span>
        <span className="text-gray-500">°F</span>
      </li>
      <li className="px-6 py-3 flex items-center gap-3">
        <Wind className="w-5 h-5 text-baseball-sky-600" />
        <span className="text-sm text-gray-900 dark:text-gray-100">
          {windSpeed} mph from the {windDirectionText}
        </span>
      </li>
      <li className="px-6 py-3 flex items-center gap-3">
        <Sun className="w-5 h-5 text-sunset-amber" />
        <span className="text-sm text-gray-900 dark:text-gray-100" id="uv">
          UV Index: {uvIndex}
        </span>
      </li>
      <li className="px-6 py-3 flex items-center gap-3">
        <Clouds className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-900 dark:text-gray-100" id="cloud">
          {cloudCover}% Cloud Cover
        </span>
      </li>
    </ul>
  );
}

export function GoogleMap(props) {
  let { lat, lng } = props;

  let qs = {
    key: "AIzaSyAxDjRpHHa_Pa1TpBy0JH2bhqRQDSqrZpU",
    center: `${lat},${lng}`,
    zoom: 18,
    maptype: "satellite",
  };

  let apiURL = "https://www.google.com/maps/embed/v1/view?";

  // Convert the query string object to a string.
  let queryString = new URLSearchParams(qs).toString();

  return (
    <iframe
      className="w-full h-64 border-0"
      src={apiURL + queryString}
      title="Field Location Map"
    ></iframe>
  );
}
