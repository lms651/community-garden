import { plantInventory, findPlant } from './plant-inventory.js';

// My current vegetables that are put into my grid
const myGarden = new Map();

window.addEventListener("DOMContentLoaded", () => {
  const dropDownBtn = document.getElementById("add-dropdown");
  const dropDownMenu = document.getElementById("myDropdown");
  
  dropDownBtn.addEventListener("click", () => {
      console.log("Dropdown button clicked");

    dropDownMenu.classList.toggle("show");
  });

  const input = document.getElementById("myInput");
  input.addEventListener("keyup", filter);

  document.querySelectorAll(".dropdown-content button").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log('a dropdown item was clicked');
      const title = btn.textContent;
      addVegToGrid(title);
  });
});
});

// Filter Function for Dropdown
function filter() {
  const userInput = document.getElementById("myInput");
  const userInputLowerCase = userInput.value.toLowerCase();
  const dropDownList = document.getElementById("myDropdown");
  const items = Array.from(dropDownList.getElementsByTagName("button"));

  items.forEach(item => {
    const txtValue = item.textContent;
    if (txtValue.toLowerCase().indexOf(userInputLowerCase) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Adds plant from dropdown into my map
function addVegToGrid(title) {
  const plant = findPlant(title);

  if (plant && !myGarden.has(title)) {
    myGarden.set(title, plant);

    // Update display grid
    saveGarden();
    renderGrid();
  }
}

// Adds map items to display grid
function renderGrid() {
  const gridContainer = document.getElementById("myGrid");
  gridContainer.innerHTML = ""; // Clear existing

  myGarden.forEach((plant) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40";
    button.innerHTML = `
      <img src="${plant.img}" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
      <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4">${plant.title}</h3>
    `;

    gridContainer.appendChild(button);
  });
}

// Save to local storage
function saveGarden() {
  // Convert the map to an array of entries, then to JSON
  const gardenArray = Array.from(myGarden.entries());
  localStorage.setItem("myGarden", JSON.stringify(gardenArray));
}

function loadGarden() {
  const saved = localStorage.getItem("myGarden");
  if (saved) {
    const entries = JSON.parse(saved);

    myGarden.clear();
    for (const [key, value] of entries) {
      myGarden.set(key, value);
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