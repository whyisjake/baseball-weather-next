import { useRouter } from "next/router";
import fields from "@/fields.js";
import _ from "lodash";

export default function Info(props) {
  const router = useRouter();
  let { field } = router.query;
  field = _.get(field, "[0]", "bancroft");

  return (
    <div className="card-modern">
      <div className="p-6">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h5>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This site is a work in progress. If you have any suggestions or
          feedback, please email me at{" "}
          <a
            href="mailto:jake@wclittleleague.org"
            className="text-baseball-sky-600 hover:text-baseball-sky-700 transition-colors underline"
          >
            jake@wclittleleague.org
          </a>
        </p>
      </div>
    </div>
  );
}
