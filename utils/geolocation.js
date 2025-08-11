// Geolocation utilities for finding closest field
import fields from '@/fields';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude  
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in miles
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find the closest field to given coordinates
 * @param {number} userLat - User's latitude
 * @param {number} userLng - User's longitude
 * @param {number} maxDistance - Maximum distance in miles (default 1)
 * @returns {Object} Object with fieldKey and distance, or null if none within range
 */
export function findClosestField(userLat, userLng, maxDistance = 1) {
  let closestField = null;
  let minDistance = Infinity;

  Object.entries(fields).forEach(([fieldKey, fieldData]) => {
    const distance = calculateDistance(
      userLat, 
      userLng, 
      fieldData.location.lat, 
      fieldData.location.lng
    );

    if (distance <= maxDistance && distance < minDistance) {
      minDistance = distance;
      closestField = { fieldKey, distance };
    }
  });

  return closestField;
}

/**
 * Get user's current position using browser geolocation
 * @returns {Promise<{lat: number, lng: number}>} User's coordinates
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported by browser');
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    console.log('Starting geolocation request...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation success:', position);
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Geolocation error:', {
          code: error.code,
          message: error.message,
          PERMISSION_DENIED: error.code === 1,
          POSITION_UNAVAILABLE: error.code === 2,
          TIMEOUT: error.code === 3
        });
        reject(error);
      },
      {
        enableHighAccuracy: false, // Faster response, less accurate is fine
        timeout: 10000, // Increase timeout to 10 seconds
        maximumAge: 600000 // 10 minutes cache
      }
    );
  });
}

// Cache for default field to avoid multiple geolocation requests
let defaultFieldCache = null;
let defaultFieldPromise = null;

/**
 * Get the default field - closest field within 1 mile, otherwise bancroft
 * Uses caching to avoid multiple geolocation requests
 * @returns {Promise<string>} Field key to use
 */
export async function getDefaultField() {
  // Return cached result if available
  if (defaultFieldCache) {
    return defaultFieldCache;
  }

  // Return existing promise if one is in progress
  if (defaultFieldPromise) {
    return defaultFieldPromise;
  }

  // Create new promise for geolocation
  defaultFieldPromise = (async () => {
    try {
      const position = await getCurrentPosition();
      const closestField = findClosestField(position.lat, position.lng, 1);
      
      const result = closestField ? closestField.fieldKey : 'bancroft';
      defaultFieldCache = result;
      return result;
    } catch (error) {
      // Don't log warning for common permission denied cases
      if (error.code !== 1) { // 1 = PERMISSION_DENIED
        console.warn('Failed to get user location, using default:', error.message);
      }
      defaultFieldCache = 'bancroft';
      return 'bancroft';
    } finally {
      defaultFieldPromise = null;
    }
  })();

  return defaultFieldPromise;
}

/**
 * Clear the default field cache (useful for testing or when location changes)
 */
export function clearDefaultFieldCache() {
  defaultFieldCache = null;
  defaultFieldPromise = null;
}