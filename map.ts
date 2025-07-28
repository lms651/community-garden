/// <reference types="google.maps" />

// const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

let map: google.maps.Map;
async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    mapId: 'c767aa2e29c36d1539b917d8'
  });

  // Optional: subscribe to map capability changes.
  map.addListener('mapcapabilities_changed', () => {
    const mapCapabilities = map.getMapCapabilities();

  if (!mapCapabilities.isAdvancedMarkersAvailable) {
    // Advanced markers are *not* available, add a fallback.
  }
});
}



export {
    initMap
}