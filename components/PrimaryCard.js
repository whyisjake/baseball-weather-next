import { WeatherDetails, GoogleMap } from "@/components/WeatherDetails";
import { Name } from "@/components/Name";
import { Address } from "@/components/Address";

export default function PrimaryCard(props) {
  const { location, name, address, placeID, data } = props;
  return (
    <div className="card widget">
      <div className="card-img-top">
        <GoogleMap {...location} />
      </div>
      <div className="card-body">
        <Name name={name} />
      </div>
      <Address address={address} placeID={placeID} />
      <WeatherDetails {...data} />
    </div>
  );
}
