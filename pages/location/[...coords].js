import { Navigation } from "../_document";
import { RotatingLines } from "react-loader-spinner";
import { useLocationWeather } from "@/components/helpers/_fetcher";
import Panels from "@/components/Panels";
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
        <main className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="list-group" id="fields">
                <Navigation />
              </div>
            </div>
            <div className="col-sm-8">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
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
      <main className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="list-group" id="fields">
              <Navigation />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="alert alert-danger">
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
      <main className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="list-group" id="fields">
              <Navigation />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="alert alert-info">
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
      <main className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="list-group" id="fields">
              <Navigation />
            </div>
          </div>
          <div className="col-sm-8">
            <PrimaryCard
              name={name}
              data={weatherData}
              location={location}
              address={address}
              placeID={placeID}
            />
            <div className="alert alert-info mt-3">
              <strong>Current Location Weather</strong><br />
              Weather data for your GPS coordinates. Additional features like hourly forecast and field details are available for specific baseball fields.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}