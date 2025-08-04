// import { filter, findPlant } from './plant-inventory.js';
import { PlantInventory } from './PlantInventory.js';
import { MyPlant } from './myPlant.js';
import { refreshCurrentUserMarker } from '../maps/profile-map.js';
import { updateUser } from '../user_logic/user-utils.js';
// listeners for dropdown menu functions on profile page
// to be implemented on render-profile.ts 
// user gets passed in in hopes it will get updated in memory correctly
function garden_init(user) {
    const dropDownBtn = document.getElementById("add-dropdown");
    const dropDownMenu = document.getElementById("myDropdown");
    const input = document.getElementById("myInput");
    if (!dropDownBtn || !dropDownMenu || !input)
        return;
    dropDownBtn.addEventListener("click", () => {
        dropDownMenu.classList.toggle("show");
    });
    input.addEventListener("keyup", PlantInventory.filter);
    document.querySelectorAll(".dropdown-content button").forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.textContent;
            addVegToGrid(title, user);
            // Close the dropdown modal
            dropDownMenu.classList.remove("show");
        });
    });
}
// Adds a new plant to the user's garden
function addVegToGrid(title, user) {
    const basePlant = PlantInventory.findPlant(title);
    if (basePlant && !user.gardenMap.has(title)) {
        const myPlant = new MyPlant(basePlant.title, basePlant.img);
        user.gardenMap.set(title, myPlant);
        updateUser(user);
        renderGrid(user);
    }
}
// Adds map items to display grid from currentuser's map
function renderGrid(user) {
    const gridContainer = document.getElementById("myGrid");
    if (!gridContainer)
        return;
    gridContainer.innerHTML = "";
    // Sort plants so flagged ones come first
    const sortedPlants = Array.from(user.gardenMap.values()).sort((a, b) => {
        return (b.forTrade ? 1 : 0) - (a.forTrade ? 1 : 0);
    });
    sortedPlants.forEach((plant) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40";
        const titleWithStar = plant.forTrade
            ? `<i class="fas fa-star text-yellow-400 text-3xl animate-pulse" style="text-shadow: 0 0 5px black;"></i> ${plant.title}`
            : plant.title;
        button.innerHTML = `
      <img src="${plant.img}" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
      <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4">${titleWithStar}</h3>
    `;
        gridContainer.appendChild(button);
        button.addEventListener("click", () => showPlantModal(plant.title, user));
    });
}
// Modal holds functions on user's myPlant
// Flag for trade slider
// Option to delete plant from their map
function showPlantModal(title, user) {
    const plant = user.gardenMap.get(title);
    if (!plant)
        return;
    const modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = plant.title;
    const flagToggle = document.getElementById("toggle");
    if (flagToggle) {
        flagToggle.checked = plant.forTrade;
        flagToggle.onchange = () => handleFlag(title, user);
    }
    const editModal = document.getElementById("edit-modal");
    editModal.classList.remove("hidden");
    const exitModal = document.getElementById("exit-edit-modal");
    exitModal.onclick = () => closePlantModal();
    const deleteBtn = document.getElementById("delete-btn");
    deleteBtn.onclick = () => handleDelete(title, user);
}
function closePlantModal() {
    const editModal = document.getElementById("edit-modal");
    editModal.classList.add("hidden");
}
// Updates value of flag toggle in plant
// Updates user garden map in memory
function handleFlag(title, user) {
    const plant = user.gardenMap.get(title);
    const toggle = document.getElementById("toggle");
    if (plant && toggle) {
        plant.forTrade = toggle.checked;
        updateUser(user);
        renderGrid(user);
        refreshCurrentUserMarker();
    }
}
// Deletes map entry from current user's map
// Updates user garden map in memory
function handleDelete(title, user) {
    user.gardenMap.delete(title);
    updateUser(user);
    renderGrid(user);
    closePlantModal();
}
export { garden_init, renderGrid };
