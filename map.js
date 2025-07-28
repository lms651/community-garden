import { loadUsers } from "./user_logic/user-utils.js";
/// <reference types="google.maps" />
let map;
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    map = new Map(document.getElementById("map"), {
        center: { lat: 42.3601, lng: -71.0589 }, // Boston
        zoom: 8,
        mapId: 'c767aa2e29c36d1539b917d8'
    });
    //   const dedhamMarker = new AdvancedMarkerElement({
    //     map,
    //     position: { lat: 42.2438, lng: -71.1660 },
    //     });
    //   // Optional: subscribe to map capability changes.
    //   map.addListener('mapcapabilities_changed', () => {
    //     const mapCapabilities = map.getMapCapabilities();
    //     if (!mapCapabilities.isAdvancedMarkersAvailable) {
    //     // Advanced markers are *not* available, add a fallback.
    //     }
    //   });
    const users = loadUsers(); // Get all users from localStorage
    await placeAllUserMarkers(users);
}
// Function to geocode user address
async function geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
            if (status === "OK" && results && results[0]) {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
            }
            else {
                console.error("Geocoding failed:", status);
                resolve(null); // fallback to null
            }
        });
    });
}
// add marker for all users
async function placeAllUserMarkers(users) {
    for (const user of users) {
        await addUserMarker(user);
    }
}
// add marker for one user
async function addUserMarker(user) {
    const address = user.getFullAddress();
    const coords = await geocodeAddress(address);
    if (coords) {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        new AdvancedMarkerElement({
            map,
            position: coords,
            title: user.username,
        });
    }
    else {
        console.warn(`Could not place marker for ${user.username}`);
    }
}
export { initMap };
