import fields from "@/fields.js";

export default function Info(props) {
  let { field } = props;

  if (!fields[field].info) return <p></p>;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">About</h5>
        <p className="card-text">
          This site is a work in progress. If you have any suggestions or
          feedback, please email me at{" "}
          <a href="mailto:jake@wclittleleague.org">jake@wclittleleague.org</a>
        </p>
      </div>
    </div>
  );
}
