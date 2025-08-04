import { User } from "../user_logic/User.js";
import { loadUsers } from "../user_logic/user-utils.js";
/// <reference types="google.maps" />

let map: google.maps.Map;
declare const toastr: any;

async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 42.3601, lng: -71.0589 }, // Boston
    zoom: 8,
    mapId: 'c767aa2e29c36d1539b917d8'
  });

  const users = loadUsers();
  await placeAllUserMarkers(users);

  // Allow visitor to enter zip and see pins nearby
  const zipInput = document.getElementById("zip-input") as HTMLInputElement;
  const autocomplete = new google.maps.places.Autocomplete(zipInput, {
    types: ["(regions)"], 
  });

// When a place is selected center map on location
autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();
  if (place.geometry && place.geometry.location) {
    const location = place.geometry.location;
    map.setCenter(location);
    map.setZoom(10);         
  } else {
    toastr.error("No geometry found for that location", "Error");
  }
});
}

// Geocode user address for long/lat
async function geocodeAddress(address: string): Promise<google.maps.LatLngLiteral | null> {
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        resolve({ lat: location.lat(), lng: location.lng() });
      } else {
        toastr.error("Geocoding failed", "Error")
        resolve(null);
      }
    });
  });
}

// Add marker for all users
async function placeAllUserMarkers(users: User[]) {
  for (const user of users) {
    await addUserMarker(user);
  }
}

// Add marker for one user
async function addUserMarker(user: User) {
  const address = user.getFullAddress();
  const coords = await geocodeAddress(address);

  if (!coords) {
    console.warn(`Could not place marker for ${user.username}`);
    return;
  }

  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // Check if the user has at least one plant flagged for trade
  const hasTradePlant = Array.from(user.gardenMap.values()).some(plant => plant.forTrade);

  const pin = new PinElement({
    background: hasTradePlant ? "#34c759" : "#FF5E5E", // green for trade, red for no trade
    glyph: user.username[0].toUpperCase(), // User's First initial as glyph
    glyphColor: "#fff",
    borderColor: hasTradePlant ? "#0a773f" : "#8b0000",
  });

  new AdvancedMarkerElement({
    map,
    position: coords,
    title: user.username,
    content: pin.element,
  });
}

export {
    initMap,
    geocodeAddress
}