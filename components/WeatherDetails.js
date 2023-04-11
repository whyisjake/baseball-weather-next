import { getWeatherDetails } from "@/pages/api/_helpers";
import { Wind, Thermometer, Sun, Clouds } from "react-bootstrap-icons";

export function WeatherDetails(props) {
  let currentWeather = props.currentWeather;

  let { windSpeed, windDirectionText, temperature, uvIndex, cloudCover } =
    getWeatherDetails(currentWeather);

  return (
    <ul className="list-group list-group-flush" id="weatherDetails">
      <li className="list-group-item card-text">
        <span id="temperature">
          <Thermometer /> {temperature}
        </span>{" "}
        <span className="font-thin">&#8457;</span>
      </li>
      <li className="list-group-item">
        <Wind /> {windSpeed}
        <span className="text-3xl">mph from the {windDirectionText}</span>
      </li>
      <li className="list-group-item">
        <span id="uv" className="">
          <Sun /> {uvIndex}
        </span>
      </li>
      <li className="list-group-item">
        <span className="">
          <span id="cloud">
            <Clouds /> {cloudCover}
          </span>
          %
        </span>{" "}
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
      className="card-img-top"
      width="100%"
      height="300"
      src={apiURL + queryString}
    ></iframe>
  );
}
