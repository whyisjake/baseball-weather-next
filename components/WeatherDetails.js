import { getWeatherDetails } from "@/pages/api/_helpers";
import { WeatherForecast } from "@/components/WeatherForecast";

export function WeatherDetails(props) {
  let currentWeather = props.currentWeather;

  let { windSpeed, windDirectionText, temperature, uvIndex, cloudCover } =
    getWeatherDetails(currentWeather);

  return (
    <div>
      <ul className="list-group list-group-flush" id="weatherDetails">
        <li className="list-group-item card-text">
          <span id="temperature">Temperature: {temperature}</span>{" "}
          <span className="font-thin">&#8457;</span>
        </li>
        <li className="list-group-item">
          <span id="wind" className="">
            Windspeed: {windSpeed}
          </span>{" "}
          <span className="text-3xl">mph from the {windDirectionText}</span>
        </li>
        <li className="list-group-item">
          <span id="uv" className="">
            UV Index: {uvIndex}
          </span>
        </li>
        <li className="list-group-item">
          <span className="">
            <span id="cloud">Cloud cover: {cloudCover}</span>%
          </span>{" "}
          <span className="text-3xl">cloud cover</span>
        </li>
      </ul>
      <WeatherForecast forecast={props} />
    </div>
  );
}

export function GoogleMap(props) {
  let { lat, lng } = props;

  // Build the query string for the iframe.
  let queryString = `https://www.google.com/maps/embed/v1/view?key=AIzaSyAxDjRpHHa_Pa1TpBy0JH2bhqRQDSqrZpU&center=${lat},${lng}&zoom=18&maptype=satellite`;
  return <iframe width="100%" height="300" src={queryString}></iframe>;
}