import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fields from '@/fields';
import { getCurrentPosition } from '@/utils/geolocation';
import { ChevronDown } from 'react-bootstrap-icons';

export default function MobileFieldDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  let { field } = router.query;
  if (field === undefined) {
    field = "bancroft";
  }
  field = field[0] || field;

  // Get current field name
  const currentFieldName = router.pathname.startsWith("/location")
    ? "📍 Current Location"
    : fields[field]?.name || "Select Field";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrentLocation = async () => {
    setIsGettingLocation(true);
    setIsOpen(false);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await getCurrentPosition();
      router.push(`/location/${position.lat},${position.lng}`);
    } catch (error) {
      let errorMessage = "Unable to get your location. ";

      if (error.code === 1) {
        errorMessage += "Location access was denied.";
      } else if (error.code === 2) {
        errorMessage += "Location information is unavailable.";
      } else if (error.code === 3) {
        errorMessage += "Location request timed out.";
      } else {
        errorMessage += "Please check your location settings.";
      }

      alert(errorMessage);
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="relative lg:hidden" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="truncate max-w-[120px]">{currentFieldName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          <div className="py-1">
            <button
              onClick={handleCurrentLocation}
              disabled={isGettingLocation}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                router.pathname.startsWith("/location")
                  ? "bg-baseball-green-700 dark:bg-baseball-green-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-baseball-green-50 dark:hover:bg-baseball-green-900/30"
              }`}
            >
              {isGettingLocation ? "📍 Getting Location..." : "📍 Current Location Weather"}
            </button>

            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            {Object.entries(fields)
              .sort((a, b) => a[1].name.localeCompare(b[1].name))
              .map(([key, value]) => (
                <Link
                  key={key}
                  href={`/field/${key}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    field === key
                      ? "bg-baseball-green-700 dark:bg-baseball-green-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-baseball-green-50 dark:hover:bg-baseball-green-900/30"
                  }`}
                >
                  {value.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
