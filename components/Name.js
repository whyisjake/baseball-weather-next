import _ from "lodash";
import { useFieldStatus } from "@/components/helpers/_fetcher";

export function Name(props) {
  const { data: status } = useFieldStatus();
  const fieldStatus = _.get(status, "isClosed", false);

  return (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3 flex-wrap">
      {props.name}
      {fieldStatus ? (
        <span className="badge-modern bg-storm-red text-white">Closed</span>
      ) : (
        <span className="badge-modern bg-baseball-green-500 text-white">Open</span>
      )}
    </h1>
  );
}
