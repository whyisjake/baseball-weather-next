import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";

/*
 * This is the main component for the field page.
 * The buttons are used to toggle the panels.
 * We have a panel for the weather details, the field resources, and the contact information.
 * The panels are hidden by default.
 * The panels are shown when the button is clicked.
 */
export default function PanelButtons(props) {
  const router = useRouter();
  let { field } = router.query;
  if (field !== undefined) {
    field = field[0];
  } else {
    field = "bancroft";
  }

  // Add an active class if we are on the current page.
  // This is used to style the buttons.

  let detailPage = _.get(router.query.field, [1], "weather");

  function isActive(page) {
    if (page === detailPage) {
      return "active";
    }
    return "";
  }

  return (
    <div className="flex justify-center gap-0">
      <Link
        className={`btn-tab rounded-l-lg ${isActive("weather") ? "btn-tab-active" : ""}`}
        href={`/field/${encodeURIComponent(field)}/weather`}
      >
        Weather Details
      </Link>
      <Link
        className={`btn-tab border-l-0 ${isActive("details") ? "btn-tab-active" : ""}`}
        href={`/field/${encodeURIComponent(field)}/details`}
      >
        Field Details
      </Link>
      <Link
        className={`btn-tab border-l-0 rounded-r-lg ${isActive("contact") ? "btn-tab-active" : ""}`}
        href={`/field/${encodeURIComponent(field)}/contact`}
      >
        Contact
      </Link>
    </div>
  );
}
