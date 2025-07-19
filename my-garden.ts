import { filter, findPlant } from './plant-inventory.js';
import { MyPlant } from './myPlant.js';

// My current vegetables that are put into my grid
let myGarden: Map<string, MyPlant> = new Map();

window.addEventListener("DOMContentLoaded", () => {
  const dropDownBtn = document.getElementById("add-dropdown");
  const dropDownMenu = document.getElementById("myDropdown");
  const input = document.getElementById("myInput");

  // null checks for ts
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
      const title = btn.textContent!;
      addVegToGrid(title);
  });
});
});

// Adds plant from dropdown into my map
function addVegToGrid(title: string) {
  const basePlant = findPlant(title);

  if (basePlant && !myGarden.has(title)) {
    // defaults to false for status
    const myPlant = new MyPlant(basePlant.title, basePlant.img);
    myGarden.set(title, myPlant);

    // Update display grid
    saveGarden();
    renderGrid();
  }
}

// Adds map items to display grid
function renderGrid(): void {
  const gridContainer = document.getElementById("myGrid")!; // asserts non-null
  gridContainer.innerHTML = ""; // Clear existing

  myGarden.forEach((plant) => {
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
    button.addEventListener("click", () => showPlantModal(plant.title));
  });
}

function showPlantModal(title: string): void {
  // fetch instance of myPlant. use title as key in map
  const plant = myGarden.get(title)!;
  let modalTitle = document.getElementById("modal-title")!;
  modalTitle.textContent = plant.title;

  const flagToggle = document.getElementById("toggle") as HTMLInputElement;
  if (plant && flagToggle) {
    flagToggle.checked = plant.forTrade; // pre-fill toggle state
    flagToggle.onchange = () => handleFlag(title); // attach or replace listener
  }

  const editModal = document.getElementById("edit-modal") as HTMLElement;
  editModal.classList.remove("hidden");

  const exitModal = document.getElementById("exit-edit-modal") as HTMLElement;
  exitModal.onclick = () => closePlantModal();

  const deletePlant = document.getElementById("delete-btn") as HTMLElement;
  deletePlant.onclick = () => handleDelete(title);
}

function closePlantModal(): void {
  const editModal = document.getElementById("edit-modal") as HTMLElement;
  editModal.classList.add("hidden");
}

function handleFlag(title: string): void {
  const plant = myGarden.get(title);
  const toggleInput = document.getElementById("toggle") as HTMLInputElement;

  if (plant && toggleInput) {
    plant.forTrade = toggleInput.checked;
    saveGarden();
    renderGrid();
  }
}

function handleDelete(title: string): void {
  myGarden.delete(title);
  saveGarden();
  renderGrid();
  closePlantModal();
}

// Save to local storage
function saveGarden(): void {
  // Convert the map to an array of entries, then to JSON
  const gardenArray = Array.from(myGarden.entries()).map(([key, plant]) => [key, plant.toJson()]);
  localStorage.setItem("myGarden", JSON.stringify(gardenArray));
}


function loadGarden(): void {
  const saved = localStorage.getItem("myGarden");
  if (saved) {
    const entries: [string, any][] = JSON.parse(saved);

    myGarden.clear();
    for (const [key, obj] of entries) {
      myGarden.set(key, MyPlant.fromJson(obj));
    }
    renderGrid();
  }
}

export {
  renderGrid,
  saveGarden,
  loadGarden,
  myGarden
}