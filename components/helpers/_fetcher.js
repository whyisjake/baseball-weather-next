import useSWR from "swr";

/**
 * Get the weather for a field
 * @param {string} field
 * @returns
 */
function useWeather(field) {
  const fieldToUse = field || "bancroft";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR("/api?school=" + fieldToUse, fetcher);

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

// Location-based weather hooks
function useLocationWeather(lat, lng) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    lat && lng ? `/api/location-weather?lat=${lat}&lng=${lng}` : null, 
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

function useLocationForecast(lat, lng) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    lat && lng ? `/api/location-forecast?lat=${lat}&lng=${lng}` : null, 
    fetcher
  );

  return {
    data,
    isError: error,
  };
}

function useLocationHourly(lat, lng) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    lat && lng ? `/api/location-hourly?lat=${lat}&lng=${lng}` : null, 
    fetcher
  );

  return {
    data,
    isError: error,
  };
}

function useLocationNext(lat, lng) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    lat && lng ? `/api/location-next?lat=${lat}&lng=${lng}` : null, 
    fetcher
  );

  return {
    data,
    isError: error,
  };
}

export { 
  useWeather, 
  useForecast, 
  useHourly, 
  useNext, 
  useLocationWeather, 
  useLocationForecast, 
  useLocationHourly, 
  useLocationNext 
};
