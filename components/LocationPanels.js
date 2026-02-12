import LocationHourly from "@/components/LocationHourly";
import LocationNext from "@/components/LocationNext";
import LocationWeatherForecast from "@/components/LocationWeatherForecast";

/*
 * Location-specific panels component for GPS coordinates.
 * Similar to Panels but works with lat/lng coordinates instead of field names.
 */
export default function LocationPanels({ lat, lng }) {
  return (
    <div className="space-y-6" id="weather-details">
      <LocationWeatherForecast lat={lat} lng={lng} />
      <LocationNext lat={lat} lng={lng} />
      <LocationHourly lat={lat} lng={lng} />
    </div>
  );
}