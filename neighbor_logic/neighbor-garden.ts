import { User } from '../user_logic/user.js';
import { loadCurrentUser } from '../user_logic/user-utils.js';
import { handleTrade } from '../trade_logic/trades.js';


// Adds map items to display grid from neighbor's map
// listeners for flagged veggies that can be clicked on to offer trade will go here


function renderNeighborGrid(neighborUser: User): void {
  const gridContainer = document.getElementById("neighbor-grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";

  // Sort plants so flagged ones come first

  const sortedPlants = Array.from(neighborUser.gardenMap.values()).sort((a, b) => {
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

    if (plant.forTrade) {
        button.addEventListener("click", () => showTradeModal(plant.title, neighborUser));
    } else {
        button.classList.add("cursor-default");
    }  });
}

// Modal allows user to propose a trade

function showTradeModal(neighborPlantTitle: string, neighborUser: User): void {
  const plant = neighborUser.gardenMap.get(neighborPlantTitle);
  if (!plant) return;

  // Load the current user
  const result = loadCurrentUser();
  if (!result) return;

  const currentUser = result.user;

  // Set modal title
  const modalTitle = document.getElementById("trade-modal-title")!;
  modalTitle.textContent = `${plant.title}`;

  // Show modal
  const tradeModal = document.getElementById("trade-modal") as HTMLElement;
  tradeModal.classList.remove("hidden");

  // Populate dropdown
  const dropdownContent = document.getElementById("trade-dropdown-content")!;
  const dropdownInput = document.getElementById("trade-dropdown-input") as HTMLInputElement;
  dropdownContent.innerHTML = "";
  dropdownContent.classList.add("hidden"); // Start hidden

  currentUser.gardenMap.forEach((plant) => {
    if (plant.forTrade) {
      const button = document.createElement("button");
      button.textContent = plant.title;
      dropdownContent.appendChild(button);

      button.addEventListener("click", () => {
        dropdownInput.value = plant.title;
        dropdownContent.classList.add("hidden"); // Hide after selection
      });
    }
  });

  // Show dropdown when input is focused
  dropdownInput.addEventListener("focus", () => {
    dropdownContent.classList.remove("hidden");
  });

  // Attach filter
  dropdownInput.addEventListener("keyup", filterTradeDropdown);

  const exitTradeModal = document.getElementById("exit-trade-modal") as HTMLElement;
  exitTradeModal.onclick = () => closeTradeModal();

  const submitTradeBtn = document.getElementById("submit-trade") as HTMLButtonElement;
  submitTradeBtn.onclick = () => { 
    handleTrade(neighborUser, neighborPlantTitle, dropdownInput.value);
    closeTradeModal();
    window.alert('trade offer sent!');
  }

}


// Filter function for trade modal dropdown
function filterTradeDropdown() {
  const userInput = document.getElementById("trade-dropdown-input") as HTMLInputElement;
  if (!userInput) {
  console.error("Input element not found!");
  return; // or handle gracefully
  }
  const userInputLowerCase = userInput.value.toLowerCase();
  
  const dropDownList = document.getElementById("trade-dropdown-content");
  if (!dropDownList) return;

  const items = Array.from(dropDownList.getElementsByTagName("button"));
  items.forEach(item => {
    const txtValue = item.textContent || "";
    item.style.display = txtValue.toLowerCase().includes(userInputLowerCase) ? "" : "none";
  });
}

function closeTradeModal(): void {
  const tradeModal = document.getElementById("trade-modal") as HTMLElement;
  tradeModal.classList.add("hidden");
  const dropdownInput = document.getElementById("trade-dropdown-input") as HTMLInputElement | null;
  if (dropdownInput) dropdownInput.value = "";
}


export {
  renderNeighborGrid
};