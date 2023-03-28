import { useRouter } from "next/router";
import Link from "next/link";

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
  field = field[0] || field;

  // Add an active class if we are on the current page.
  // This is used to style the buttons.
  let detailPage = router.query.field[1] || "";

  function isActive(page) {
    if (page === detailPage) {
      return "active";
    }
    return "";
  }

  return (
    <div className="panel-buttons btn-group">
      <Link
        className={`btn btn-light ${isActive("weather")}`}
        href={`/field/${encodeURIComponent(field)}/weather`}
      >
        Weather Details
      </Link>
      <Link
        className={`btn btn-light ${isActive("details")}`}
        href={`/field/${encodeURIComponent(field)}/details`}
      >
        Field Details
      </Link>
      <Link
        className={`btn btn-light ${isActive("contact")}`}
        href={`/field/${encodeURIComponent(field)}/contact`}
      >
        Contact
      </Link>
    </div>
  );
}
