import { getWeatherDetails } from "@/pages/api/_helpers";
import { useRouter } from "next/router";
import useSWR from "swr";

export function WeatherForecast(props) {
  console.log(props);

  const router = useRouter();
  let { field } = router.query;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/forecast?school=" + field, fetcher);

  if (error) return <p>No field found</p>;
  if (!data) return <p></p>;

  console.log(data);

  // Build an array of the next seven days.
  let days = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000));
  }

  let conditions = [];
  for (let i = 0; i < 7; i++) {
    // Get the precipitationChance
    let precipitationChance = data.forecastDaily.days[i].precipitationChance;

    // Precipitation chance is a percentage, so we need to multiply by 100.
    precipitationChance = Math.round(precipitationChance * 100);

    let chance = `${data.forecastDaily.days[i].conditionCode}`;

    if (precipitationChance > 0) {
      chance += ` (${precipitationChance}%)`;
    }
    conditions.push(chance);
  }

  // Return a table with seven columrns.
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          {days.map((day) => (
            <th key={day}>{day.toLocaleDateString()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {conditions.map((condition, idx) => (
            <td key={idx}>{condition}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export function GoogleMap(props) {
  let { lat, lng } = props;

  // Build the query string for the iframe.
  let queryString = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&layer=s&maptype=satellite`;
  return <iframe width="100%" height="300" src={queryString}></iframe>;
}
