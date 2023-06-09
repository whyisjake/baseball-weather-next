// Helpers for the API routes.
// Path: pages/api/_helpers.js
const jwt = require("jsonwebtoken");
const fields = require("../../fields");
const axios = require("axios");

/**
 * Generate the token for the WeatherKit API.
 * @returns {string} token
 */
function generateWeatherKitConfigToken() {
  // This is the key file you downloaded from Apple
  const privateKey = process.env.AuthKey;

  // Creating the signed token needs specific data
  const token = jwt.sign(
    {
      sub: "org.wclittleleague.weather", // the reverse URL App Id you made above
    },
    privateKey,
    {
      issuer: "36ERVRQ23S", // find your TeamID in your developer account
      expiresIn: "1h", // give it 1 hour of validity
      keyid: "2FY5C4PVK7", // this is the ID for the key you created
      algorithm: "ES256", // this is the algorithm Apple used
      header: {
        // see details below for this
        id: "36ERVRQ23S.org.wclittleleague.weather",
      },
    }
  );
  return token;
}

/**
 * Generate the API URL for the WeatherKit API.
 * @param {string} school
 * @param {boolean} current
 * @returns {string} url
 */
function generateApiUrl(school, forecast = false) {
  const baseURL = "https://weatherkit.apple.com/api/v1/weather/en/";

  const lat = fields[school].location.lat;
  const lng = fields[school].location.lng;

  // If we want the current weather, we need to use a different API endpoint.
  const dataSets = forecast;
  const timezone = "America/Los_Angeles";

  const url = `${baseURL}${lat}/${lng}?dataSets=${dataSets}&timezone=${timezone}`;
  return url;
}

/**
 * Datasets for the WeatherKit API.
 * @returns {object} weatherData
 * @see https://developer.apple.com/documentation/weatherkitrestapi/dataset
 */
const dataSets = {
  currentWeather: "currentWeather",
  forecastDaily: "forecastDaily",
  forecastHourly: "forecastHourly",
  forecastNextHour: "forecastNextHour",
  weatherAlerts: "weatherAlerts",
};

async function getWeather(req, forecast = false) {
  const token = generateWeatherKitConfigToken();

  // add the token to your headers
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let school = req.query.school || "OGMS";

  const url = generateApiUrl(school, forecast);

  const { data: weatherData } = await axios.get(url, config);

  return weatherData;
}

function getWeatherDetails(currentWeather) {
  // Convert the wind speed from kph to mph.
  let windSpeed = Math.round(currentWeather.windSpeed * 0.621371);
  let windDirection = currentWeather.windDirection;

  // Convert the wind direction from degrees to cardinal directions.
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
  let temperature = Math.round((currentWeather.temperature * 9) / 5 + 32);

  // Initialize the UV index.
  let uvIndex = currentWeather.uvIndex;

  // Initialize the cloud cover.
  let cloudCover = currentWeather.cloudCover;

  // Convert the cloud cover from a decimal to a percentage.
  cloudCover = Math.round(cloudCover * 100);

  return {
    windSpeed,
    windDirectionText,
    temperature,
    uvIndex,
    cloudCover,
  };
}

export {
  generateWeatherKitConfigToken,
  generateApiUrl,
  getWeather,
  getWeatherDetails,
};
