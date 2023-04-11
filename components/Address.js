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
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <Map />{" "}
        <a
          className="icon-link icon-link-hover text-decoration-none"
          href={url}
        >
          {props.address}
        </a>
      </li>
    </ul>
  );
}
