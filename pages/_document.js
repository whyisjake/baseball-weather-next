import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import fields from "@/fields";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getDefaultField, getCurrentPosition } from "@/utils/geolocation";

export function Navigation(props) {
  const router = useRouter();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  let { field } = router.query;
  if (field === undefined) {
    field = "bancroft";
  }
  field = field[0] || field;

  const handleCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      console.log('Requesting location permission...');
      const position = await getCurrentPosition();
      console.log('Location received:', position);
      
      // Navigate to current location weather
      router.push(`/location/${position.lat},${position.lng}`);
    } catch (error) {
      console.error("Location error details:", error);
      
      let errorMessage = "Unable to get your location. ";
      
      if (error.code === 1) {
        errorMessage += "Location access was denied. Please allow location access and try again.";
      } else if (error.code === 2) {
        errorMessage += "Location information is unavailable. Please try again.";
      } else if (error.code === 3) {
        errorMessage += "Location request timed out. Please try again.";
      } else if (error.message?.includes('not supported')) {
        errorMessage += "Your browser doesn't support location services.";
      } else {
        errorMessage += "Please check your location settings and try again.";
      }
      
      alert(errorMessage);
    } finally {
      setIsGettingLocation(false);
    }
  };

  // For each field, return a list item with the field name.
  return (
    <div className="space-y-1">
      <button
        className={
          router.pathname.startsWith("/location")
            ? "nav-link-modern nav-link-active w-full text-left"
            : "nav-link-modern w-full text-left"
        }
        onClick={handleCurrentLocation}
        disabled={isGettingLocation}
      >
        {isGettingLocation ? (
          <>📍 Getting Location...</>
        ) : (
          <>📍 Current Location Weather</>
        )}
      </button>
      {Object.entries(fields)
        .sort((a, b) => a[1].name.localeCompare(b[1].name))
        .map(([key, value]) => (
          <Link
            href={`/field/${key}`}
            className={
              field === key
                ? "nav-link-modern nav-link-active"
                : "nav-link-modern"
            }
            key={key}
          >
            {value.name}
          </Link>
        ))}
    </div>
  );
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
