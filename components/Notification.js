import status from "@/status.js";

export default function Notification() {
  if (status.isClosed) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Notice:</strong> {status.updated} — {status.message}
      </div>
    );
  } else {
    return <></>;
  }
}
