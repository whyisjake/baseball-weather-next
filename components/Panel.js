import { useRouter } from "next/router";
import { WeatherDetails } from "@/components/WeatherDetails";
import Info from "@/components/Info";
import Hourly from "@/components/Hourly";
import Next from "@/components/Next";
// import GoogleMap from "@/components/GoogleMap";

/*
 * This is the panels component.
 * The active panel is passed by a prop.
 */
export default function Panel(props) {
  if (props.panel === "weather") {
    return (
      <div className="panel" id="weather-details">
        <Next />
        <Hourly />
      </div>
    );
  }
  if (props.panel === "details") {
    return <div className="panel" id="field-resources"></div>;
  }

  if (props.panel === "contact") {
    return (
      <div className="panel" id="field-resources">
        <Info />
      </div>
    );
  }
}
