import { Navigation } from "../_document";
import { RotatingLines } from "react-loader-spinner";
import { useLocationWeather } from "@/components/helpers/_fetcher";
import LocationPanels from "@/components/LocationPanels";
import PrimaryCard from "@/components/PrimaryCard";
import Head from "@/components/Head";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function LocationWeather({ props }) {
  const router = useRouter();
  const { coords } = router.query;
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (coords && coords.length >= 1) {
      const coordString = coords[0];
      const [lat, lng] = coordString.split(',').map(Number);
      
      if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
        setLocationData({ lat, lng });
      } else {
        setLocationData(null);
      }
    }
  }, [coords]);

  const { data: weatherData, isLoading, isError } = useLocationWeather(
    locationData?.lat, 
    locationData?.lng
  );

  if (isLoading)
    return (
      <>
        <Head />
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="hidden lg:block lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-gray-900/50 p-4 lg:sticky lg:top-20" id="fields">
                <Navigation />
              </div>
            </aside>
            <div className="w-full lg:w-2/3">
              <div className="flex justify-center items-center h-48">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
    
  if (isError) return (
    <>
      <Head />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-gray-900/50 p-4 lg:sticky lg:top-20" id="fields">
              <Navigation />
            </div>
          </aside>
          <div className="w-full lg:w-2/3">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              Error loading weather for your location. Please try again.
            </div>
          </div>
        </div>
      </main>
    </>
  );

  if (!weatherData || !locationData) return (
    <>
      <Head />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-gray-900/50 p-4 lg:sticky lg:top-20" id="fields">
              <Navigation />
            </div>
          </aside>
          <div className="w-full lg:w-2/3">
            <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-400 dark:border-blue-800 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-lg">
              No location data available.
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const name = "📍 Current Location";
  const address = `${locationData.lat.toFixed(4)}, ${locationData.lng.toFixed(4)}`;
  const location = locationData;
  const placeID = "";

  return (
    <>
      <Head />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-gray-900/50 p-4 lg:sticky lg:top-20" id="fields">
              <Navigation />
            </div>
          </aside>
          <div className="w-full lg:w-2/3 space-y-6">
            <PrimaryCard
              name={name}
              data={weatherData}
              location={location}
              address={address}
              placeID={placeID}
            />
            <LocationPanels lat={locationData.lat} lng={locationData.lng} />
          </div>
        </div>
      </main>
    </>
  );
}