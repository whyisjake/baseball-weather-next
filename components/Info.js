import { useRouter } from "next/router";
import fields from "@/fields.js";
import _ from "lodash";

export default function Info(props) {
  const router = useRouter();
  let { field } = router.query;
  field = _.get(field, "[0]", "bancroft");

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
