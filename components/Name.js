import status from "@/status";

export function Name(props) {
  const fieldStatus = _.get(status, "isClosed", false);

  return (
    <h1 className="card-title">
      {props.name}{" "}
      {fieldStatus ? (
        <span className="badge text-bg-danger">Closed</span>
      ) : (
        <span className="badge text-bg-success">Open</span>
      )}
    </h1>
  );
}
