import { filter, findPlant } from './plant-inventory.js';
import { MyPlant } from './myPlant.js';
import { User } from './user.js';
import { loadCurrentUser } from './user-utils.js';
// listeners for dropdown menu functions on profile page
// to be implemented on render-profile.ts 
// will pass in current user's map
function gardent_init(currentUserMap) {
    const dropDownBtn = document.getElementById("add-dropdown");
    const dropDownMenu = document.getElementById("myDropdown");
    const input = document.getElementById("myInput");
    // null checks
    if (!dropDownBtn || !dropDownMenu || !input) {
        return;
    }
    dropDownBtn.addEventListener("click", () => {
        dropDownMenu.classList.toggle("show");
    });
    input.addEventListener("keyup", filter);
    document.querySelectorAll(".dropdown-content button").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log('a dropdown item was clicked');
            const title = btn.textContent;
            addVegToGrid(title, currentUserMap);
        });
    });
}
// Adds plant from dropdown into user's map
function addVegToGrid(title, currentUserMap) {
    const basePlant = findPlant(title);
    if (basePlant && !currentUserMap.has(title)) {
        const myPlant = new MyPlant(basePlant.title, basePlant.img);
        currentUserMap.set(title, myPlant);
        // Update user in memory
        // Update profile display grid
        saveGarden(currentUserMap);
        renderGrid(currentUserMap);
    }
}
// Adds map items to display grid from currentuser's map
function renderGrid(currentUserMap) {
    const gridContainer = document.getElementById("myGrid"); // asserting non-null.
    if (!gridContainer)
        return; // Skip if not on the right page
    gridContainer.innerHTML = ""; // Clear existing
    // Sort plants so flagged ones come first
    const sortedPlants = Array.from(currentUserMap.values()).sort((a, b) => {
        return (b.forTrade ? 1 : 0) - (a.forTrade ? 1 : 0);
    });
    sortedPlants.forEach((plant) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40";
        const titleWithStar = plant.forTrade ? `<i class="fas fa-star text-yellow-400 text-3xl animate-pulse" style="text-shadow: 0 0 5px black;"></i> ${plant.title}` : plant.title;
        button.innerHTML = `
      <img src="${plant.img}" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
      <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4">${titleWithStar}</h3>
    `;
        gridContainer.appendChild(button);
        // Listener added here for the grid buttons
        button.addEventListener("click", () => showPlantModal(plant.title, currentUserMap));
    });
}
// Modal holds functions on the instance of user's myPlant
// Flag for trade slider
// Option to delete plant from their map
function showPlantModal(title, currentUserMap) {
    // fetch instance of myPlant in current user's map. 
    // use plant title as key in map
    const plant = currentUserMap.get(title); // asserts non-null
    let modalTitle = document.getElementById("modal-title");
    // Adds plant's name to modal
    modalTitle.textContent = plant.title;
    const flagToggle = document.getElementById("toggle");
    if (plant && flagToggle) {
        flagToggle.checked = plant.forTrade; // pre-fill toggle state
        flagToggle.onchange = () => handleFlag(title, currentUserMap); // attach or replace listener
    }
    const editModal = document.getElementById("edit-modal");
    editModal.classList.remove("hidden");
    const exitModal = document.getElementById("exit-edit-modal");
    exitModal.onclick = () => closePlantModal();
    const deletePlant = document.getElementById("delete-btn");
    deletePlant.onclick = () => handleDelete(title, currentUserMap);
}
function closePlantModal() {
    const editModal = document.getElementById("edit-modal");
    editModal.classList.add("hidden");
}
// Updates value of flag toggle in plant
// Updates user garden map in memory
function handleFlag(title, currentUserMap) {
    const plant = currentUserMap.get(title);
    const toggleInput = document.getElementById("toggle");
    if (plant && toggleInput) {
        plant.forTrade = toggleInput.checked;
        saveGarden(currentUserMap);
        renderGrid(currentUserMap);
    }
}
// Deletes map entry from current user's map
// Updates user garden map in memory
function handleDelete(title, currentUserMap) {
    currentUserMap.delete(title);
    saveGarden(currentUserMap);
    renderGrid(currentUserMap);
    closePlantModal();
}
function saveGarden(currentUserMap) {
    const currentUserData = loadCurrentUser();
    if (!currentUserData)
        return;
    const { user, index } = currentUserData;
    // Update user's gardenMap with the current map passed in
    user.gardenMap = currentUserMap;
    // Load all users from localStorage
    const usersRaw = localStorage.getItem("users") || "[]";
    const users = JSON.parse(usersRaw).map((u) => User.fromJson(u));
    // Replace the user at current index
    users[index] = user;
    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    // Update the stored currentUserIndex if needed
    localStorage.setItem("currentUserIndex", String(index));
}
export { renderGrid, saveGarden, gardent_init };
