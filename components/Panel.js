import Info from "@/components/Info";
import Hourly from "@/components/Hourly";
import Next from "@/components/Next";
import FieldDetails from "@/components/FieldDetails";
import { WeatherForecast } from "@/components/WeatherForecast";

/*
 * This is the panels component.
 * The active panel is passed by a prop.
 */
export default function Panel(props) {
  if (props.panel === "weather") {
    return (
      <div className="space-y-6" id="weather-details">
        <WeatherForecast />
        <Next />
        <Hourly />
      </div>
    );
  }
  if (props.panel === "details") {
    return (
      <div id="field-resources">
        <FieldDetails />
      </div>
    );
  }

  if (props.panel === "contact") {
    return (
      <div id="field-resources">
        <Info />
      </div>
    );
  }
}
