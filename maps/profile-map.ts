import { User } from "../user_logic/User.js";
import { loadUsers, loadCurrentUser } from "../user_logic/user-utils.js";
import { geocodeAddress } from "./map.js";
import { PlantInventory } from "../garden/PlantInventory.js";
/// <reference types="google.maps" />

let map: google.maps.Map;
// Saves user markers for filtering 
const userMarkers: { user: User, marker: google.maps.marker.AdvancedMarkerElement }[] = [];

async function init_profile_map(): Promise<void> {
  const result = loadCurrentUser();
  if (!result) return;
  const currentUser = result.user;

  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  const { Autocomplete } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

const currentCoords = await geocodeAddress(currentUser.getFullAddress());
if (!currentCoords) {
  console.warn("Could not get location for current user");
  return;
}

  map = new Map(document.getElementById("map-profile") as HTMLElement, {
    center: currentCoords, // Current User's address
    zoom: 8,
    mapId: 'c767aa2e29c36d1539b917d8'
  });

  const users = loadUsers(); // Get all users from localStorage
  await placeAllUserMarkers(users);

}

// Add marker for all users for profile page

async function placeAllUserMarkers(users: User[]) {
  for (const user of users) {
    await addProfileUserMarker(user);
  }
}

// Add marker for one user on profile page
// Currentuser will have enlargened marker

async function addProfileUserMarker(user: User) {
  const result = loadCurrentUser();
  if (!result) return;

  const currentUser = result.user;

  const address = user.getFullAddress();
  const coords = await geocodeAddress(address);

  if (!coords) {
    console.warn(`Could not place marker for ${user.username}`);
    return;
  }

  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  const isCurrentUser = user.username === currentUser.username;

  const hasTradePlant = Array.from(user.gardenMap.values()).some(plant => plant.forTrade);

  const pin = new PinElement({
    background: hasTradePlant ? "#34c759" : "#FF5E5E", // green for trade, red otherwise
    glyph: isCurrentUser ? "★" : user.username[0].toUpperCase(),
    glyphColor: "#fff",
    borderColor: hasTradePlant ? "#0a773f" : "#8b0000",
    scale: isCurrentUser ? 1.5 : 1.0,  // make current user’s marker slightly bigger
  });

  const marker = new AdvancedMarkerElement({
    map,
    position: coords,
    title: user.username,
    content: pin.element,
    gmpClickable: !isCurrentUser,
  });
    // Saves marker for filtering
    userMarkers.push({ user, marker });

  if (!isCurrentUser) {
    pin.element.style.cursor = "pointer";
    pin.element.setAttribute("tabindex", "0");
    pin.element.setAttribute("role", "button");
    pin.element.setAttribute("aria-label", `View ${user.username}'s garden`);

    pin.element.addEventListener("click", () => {
      window.location.href = `neighbor.html?user=${encodeURIComponent(user.username)}`;
    });

    pin.element.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = `neighbor.html?user=${encodeURIComponent(user.username)}`;
      }
    });
  }

}

// Filter markers by crop presence
function filterMarkersByCrop(cropTitle: string): void {
  userMarkers.forEach(({ user, marker }) => {
    const hasCrop = Array.from(user.gardenMap.values()).some(
      plant => plant.title === cropTitle
    );

    marker.map = hasCrop ? map : null;
  });
}

// Listener for filter
function filter_map_init(): void {
  const filterDropDownBtn = document.getElementById("map-dropdown");
  const filterDropDownMenu = document.getElementById("filter-map-dropdown");
  const mapInput = document.getElementById("myMapInput");

  if (!filterDropDownBtn || !filterDropDownMenu || !mapInput) return;

  filterDropDownBtn.addEventListener("click", () => {
    filterDropDownMenu.classList.toggle("show");
  });

  mapInput.addEventListener("keyup", PlantInventory.filterForMap);

  document.querySelectorAll(".map-dropdown-content button").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.textContent!;
      filterMarkersByCrop(title);

      // Close the dropdown modal
      filterDropDownMenu.classList.remove("show");
    });
  });
}

// To be called after trade status on vegetables are updated
async function refreshCurrentUserMarker(): Promise<void> {
  const result = loadCurrentUser();
  if (!result) return;

  const currentUser = result.user;

  // Remove the old marker from the map and userMarkers array
  const existing = userMarkers.find(entry => entry.user.username === currentUser.username);
  if (existing) {
    existing.marker.map = null; // removes it from the map
    const index = userMarkers.indexOf(existing);
    if (index !== -1) userMarkers.splice(index, 1);
  }

  // Re-add with updated info (color, glyph, etc.)
  await addProfileUserMarker(currentUser);
}

export {
    init_profile_map,
    filter_map_init,
    refreshCurrentUserMarker
}
