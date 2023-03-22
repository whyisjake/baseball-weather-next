const axios = require("axios");
const { generateWeatherKitConfigToken, generateApiUrl } = require("../_helpers");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const token = generateWeatherKitConfigToken();

  // add the token to your headers
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let school = req.query.school || "OGMS";
  const url = generateApiUrl(school, true);

  // get the data
  const { data: weatherData } = await axios.get(url, config);

  // return the data to your front end
  res.json(weatherData);
}
