import { Map } from "react-bootstrap-icons";

export function Address(props) {
  let address = encodeURIComponent(props.address);
  let placeID = encodeURIComponent(props.placeID);

  let queryParams = {
    query: address,
    placeID: placeID,
  };

  // convert the query params to a string
  let queryString = Object.keys(queryParams)
    .map((key) => key + "=" + queryParams[key])
    .join("&");

  let url = `https://www.google.com/maps/search/?api=1&${queryString}`;

  return (
    <div className="border-t border-gray-200">
      <div className="px-6 py-3">
        <a
          className="flex items-center gap-2 text-baseball-sky-600 hover:text-baseball-sky-700 transition-colors duration-200 no-underline"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Map className="w-4 h-4" />
          <span className="text-sm font-medium">{props.address}</span>
        </a>
      </div>
    </div>
  );
}
