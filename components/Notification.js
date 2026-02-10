import { useFieldStatus } from "@/components/helpers/_fetcher";

export default function Notification() {
  const { data: status } = useFieldStatus();

  if (status && status.isClosed) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Notice:</strong> {status.updated} — {status.message}
        {status.reason && <> Reason: {status.reason}</>}
      </div>
    );
  } else {
    return <></>;
  }
}
