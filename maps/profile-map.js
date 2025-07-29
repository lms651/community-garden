import { loadUsers, loadCurrentUser } from "../user_logic/user-utils.js";
import { geocodeAddress } from "./map.js";
/// <reference types="google.maps" />
let map;
async function init_profile_map() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const currentUser = result.user;
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { Autocomplete } = await google.maps.importLibrary("places");
    //   await google.maps.importLibrary("places");
    const currentCoords = await geocodeAddress(currentUser.getFullAddress());
    if (!currentCoords) {
        console.warn("Could not get location for current user");
        return;
    }
    map = new Map(document.getElementById("map-profile"), {
        center: currentCoords, // Current User's address
        zoom: 8,
        mapId: 'c767aa2e29c36d1539b917d8'
    });
    const users = loadUsers(); // Get all users from localStorage
    await placeAllUserMarkers(users);
}
// Add marker for all users for profile page
async function placeAllUserMarkers(users) {
    for (const user of users) {
        await addProfileUserMarker(user);
    }
}
// Add marker for one user on profile page
// Currentuser will have enlargened marker
async function addProfileUserMarker(user) {
    const result = loadCurrentUser();
    if (!result)
        return;
    const currentUser = result.user;
    const address = user.getFullAddress();
    const coords = await geocodeAddress(address);
    if (!coords) {
        console.warn(`Could not place marker for ${user.username}`);
        return;
    }
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    const isCurrentUser = user.username === currentUser.username;
    const hasTradePlant = Array.from(user.gardenMap.values()).some(plant => plant.forTrade);
    const pin = new PinElement({
        background: hasTradePlant ? "#34c759" : "#FF5E5E", // green for trade, red otherwise
        glyph: isCurrentUser ? "★" : user.username[0].toUpperCase(),
        glyphColor: "#fff",
        borderColor: hasTradePlant ? "#0a773f" : "#8b0000",
        scale: isCurrentUser ? 1.5 : 1.0, // make current user’s marker slightly bigger
    });
    const marker = new AdvancedMarkerElement({
        map,
        position: coords,
        title: user.username,
        content: pin.element,
        gmpClickable: !isCurrentUser,
    });
    if (!isCurrentUser) {
        pin.element.style.cursor = "pointer";
        pin.element.setAttribute("tabindex", "0");
        pin.element.setAttribute("role", "button");
        pin.element.setAttribute("aria-label", `View ${user.username}'s garden`);
        pin.element.addEventListener("click", () => {
            window.location.href = `neighbor.html?user=${encodeURIComponent(user.username)}`;
        });
        pin.element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.location.href = `neighbor.html?user=${encodeURIComponent(user.username)}`;
            }
        });
    }
}
export { init_profile_map };
