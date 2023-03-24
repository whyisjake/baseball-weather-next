const { getWeather } = require("../_helpers");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const weatherData = await getWeather(req, "forecastNextHour");

  // return the data to your front end
  res.json(weatherData);
}
