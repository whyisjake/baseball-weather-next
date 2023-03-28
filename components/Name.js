import status from "@/status";

export default function Name(props) {
  const fieldStatus = _.get(status, "isClosed", false);

  if (fieldStatus) {
    return (
      <h1 className="card-title">
        {props.name} <span class="badge text-bg-danger">Closed</span>
      </h1>
    );
  }

  return <h1 className="card-title">{props.name}</h1>;
}
