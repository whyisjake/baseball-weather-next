import { useRouter } from "next/router";
import PanelButtons from "@/components/PanelButtons";
import Panel from "@/components/Panel";

/*
 * This is the panels component.
 * The panels are hidden by default.
 * The panels are shown when the button is clicked.
 * The panels are hidden when the button is clicked again.
 * The panels are hidden when the button is clicked again.
 * These panels are controlled by the PanelButtons component.
 *
 */
export default function Panels(props) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PanelButtons />
      <Panel panel={props.active} />
    </div>
  );
}
