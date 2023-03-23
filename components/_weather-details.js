import { getWeatherDetails } from "@/pages/api/_helpers";

export function WeatherDetails(props) {
  let currentWeather = props.currentWeather;

  let { windSpeed, windDirectionText, temperature, uvIndex, cloudCover } =
    getWeatherDetails(currentWeather);

  return (
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
      {/* <li className="list-group-item"><strong>Forecast for today:</strong></li> */}
    </ul>
  );
}

export function GoogleMap(props) {
  let { lat, lng } = props;

  // Build the query string for the iframe.
  let queryString = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&layer=s&maptype=satellite`;
  return <iframe width="100%" height="300" src={queryString}></iframe>;
}
