const jwt = require("jsonwebtoken");
const axios = require("axios");

function generateWeatherKitConfigToken() {
  const privateKey = process.env.AuthKey;

  const token = jwt.sign(
    {
      sub: "org.wclittleleague.weather",
    },
    privateKey,
    {
      issuer: "36ERVRQ23S",
      expiresIn: "1h",
      keyid: "2FY5C4PVK7",
      algorithm: "ES256",
      header: {
        id: "36ERVRQ23S.org.wclittleleague.weather",
      },
    }
  );
  return token;
}

function generateLocationApiUrl(lat, lng) {
  const baseURL = "https://weatherkit.apple.com/api/v1/weather/en/";
  const dataSets = "forecastHourly";
  const timezone = "America/Los_Angeles";

  const url = `${baseURL}${lat}/${lng}?dataSets=${dataSets}&timezone=${timezone}`;
  return url;
}

async function getLocationHourly(lat, lng) {
  const token = generateWeatherKitConfigToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const url = generateLocationApiUrl(lat, lng);

  try {
    const { data: weatherData } = await axios.get(url, config);
    return weatherData;
  } catch (error) {
    console.error("Error fetching location hourly:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ 
        error: "Missing latitude or longitude parameters" 
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ 
        error: "Invalid latitude or longitude values" 
      });
    }

    const weatherData = await getLocationHourly(latitude, longitude);
    
    res.json(weatherData);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch hourly data for location" 
    });
  }
}