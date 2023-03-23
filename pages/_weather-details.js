export function WeatherDetails(props) {
  let currentWeather = props.currentWeather;

   // Convert the wind speed from m/s to mph.
   let windSpeed = Math.round(currentWeather.windSpeed * 2.23694);
   let windDirection = currentWeather.windDirection;
   let windDirectionText = "";
   if (windDirection >= 0 && windDirection <= 22.5) {
     windDirectionText = "N";
   } else if (windDirection > 22.5 && windDirection <= 67.5) {
     windDirectionText = "NE";
   } else if (windDirection > 67.5 && windDirection <= 112.5) {
     windDirectionText = "E";
   } else if (windDirection > 112.5 && windDirection <= 157.5) {
     windDirectionText = "SE";
   } else if (windDirection > 157.5 && windDirection <= 202.5) {
     windDirectionText = "S";
   } else if (windDirection > 202.5 && windDirection <= 247.5) {
     windDirectionText = "SW";
   } else if (windDirection > 247.5 && windDirection <= 292.5) {
     windDirectionText = "W";
   } else if (windDirection > 292.5 && windDirection <= 337.5) {
     windDirectionText = "NW";
   } else if (windDirection > 337.5 && windDirection <= 360) {
     windDirectionText = "N";
   }

   // Convert the temperature from Celcius to Fahrenheit.
   let temperature = Math.round(currentWeather.temperature * 9/5 + 32);

   // Initialize the UV index.
   let uvIndex = currentWeather.uvIndex;

   // Initialize the cloud cover.
   let cloudCover = currentWeather.cloudCover;

  return (
    <ul className="list-group list-group-flush" id="weatherDetails">
      <li className="list-group-item card-text"><span id="temperature">Temperature: {temperature}</span> <span className="font-thin">&#8457;</span></li>
      <li className="list-group-item"><span id="wind" className="">Windspeed: {windSpeed}</span> <span className="text-3xl">mph from the {windDirectionText}</span></li>
      <li className="list-group-item"><span id="uv" className="">UV Index: {uvIndex}</span></li>
      <li className="list-group-item"><span className=""><span id="cloud">Cloud cover: {cloudCover}</span>%</span> <span className="text-3xl">cloud cover</span></li>
      {/* <li className="list-group-item"><strong>Forecast for today:</strong></li> */}
    </ul>
  )
}

export function GoogleMap(props) {
  let {lat, lng} = props;

  // Build the query string for the iframe.
  let queryString = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&layer=s&maptype=satellite`;
  return (
    <iframe width="100%" height="300" src={queryString}></iframe>
  )
}
