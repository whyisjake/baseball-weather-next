import { useForecast } from "@/components/helpers/_fetcher";
import { useRouter } from "next/router";
import { weatherTypes } from "./_weatherTypes";
import { _get } from "lodash";
import Skycons from "react-skycons";

export function WeatherForecast(props) {
  const skycons = new Skycons({ color: "blue" });

  const router = useRouter();
  let { field } = router.query;

  // Ensure that the field is set on the homepage.
  field = field || "bancroft";

  // Get the forecast for the field.
  const { data, error } = useForecast(field);

  if (error) return <p>No field found</p>;
  if (!data) return <p></p>;

  // Build an array of the next seven days.
  let days = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000));
  }

  let conditions = [];
  for (let i = 0; i < 7; i++) {
    // Get the precipitationChance
    let skycon = weatherTypes[data.forecastDaily.days[i].conditionCode];
    let precipitationChance = data.forecastDaily.days[i].precipitationChance;

    // Precipitation chance is a percentage, so we need to multiply by 100.
    precipitationChance = Math.round(precipitationChance * 100);

    // let chance = `${data.forecastDaily.days[i].conditionCode}`;
    let chance = _.get(skycon, "name", "Clear");

    if (precipitationChance > 0) {
      chance += ` (${precipitationChance}%)`;
    }

    let icon = _.get(skycon, "icon", "CLEAR_DAY");

    conditions.push({ chance, icon });
  }

  // Return a table with seven columrns.
  return (
    <table className="table table-striped table-centered">
      <thead>
        <tr>
          {days.map((day) => (
            <th key={day}>
              {day.toLocaleDateString("en-US", { weekday: "long" })}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {conditions.map((condition, idx) => (
            <td key={idx}>
              <Skycons
                color="black"
                type={condition.icon}
                animate={true}
                resizeClear={true}
              />
              <br></br>
              {condition.chance}
            </td>
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
