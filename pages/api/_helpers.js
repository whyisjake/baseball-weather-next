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
  const dataSets = forecast ? "forecastDaily" : "currentWeather";
  const timezone = "America/Los_Angeles";

  const url = `${baseURL}${lat}/${lng}?dataSets=${dataSets}&timezone=${timezone}`;
  return url;
}

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

export { generateWeatherKitConfigToken, generateApiUrl, getWeather };
