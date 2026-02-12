import { useFieldStatus } from "@/components/helpers/_fetcher";

export default function Notification() {
  const { data: status } = useFieldStatus();

  if (status && status.isClosed) {
    return (
      <div className="bg-storm-red/10 border border-storm-red/20 rounded-lg px-4 py-3" role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-storm-red" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-storm-red">
              <strong>Notice:</strong> {status.updated} — {status.message}
              {status.reason && <> Reason: {status.reason}</>}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
