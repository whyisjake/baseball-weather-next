import useSWR from "swr";

/**
 * Get the weather for a field
 * @param {string} field
 * @returns
 */
function useWeather(field) {
  field = field || "bancroft";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR("/api?school=" + field, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

function useForecast(field) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/forecast?school=" + field, fetcher);

  return {
    data,
    isError: error,
  };
}

function useHourly(field) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/hourly?school=" + field, fetcher);

  return {
    data,
    isError: error,
  };
}

function useNext(field) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/next?school=" + field, fetcher);

  return {
    data,
    isError: error,
  };
}

export { useWeather, useForecast, useHourly, useNext };
