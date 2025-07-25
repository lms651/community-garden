import { User } from '../user_logic/user.js';


// Adds map items to display grid from neighbor's map
// listeners for flagged veggies that can be clicked on to offer trade will go here


function renderNeighborGrid(user: User): void {
  const gridContainer = document.getElementById("neighbor-grid");
  if (!gridContainer) return;

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

    if (plant.forTrade) {
        button.addEventListener("click", () => showTradeModal(plant.title, user));
    } else {
        button.classList.add("cursor-default");
    }  });
}

// Modal allows user to propose a trade

function showTradeModal(title: string, user: User): void {
  const plant = user.gardenMap.get(title);
  if (!plant) return;

  const modalTitle = document.getElementById("trade-modal-title")!;
  modalTitle.textContent = plant.title;

  const editModal = document.getElementById("trade-modal") as HTMLElement;
  editModal.classList.remove("hidden");

  const exitModal = document.getElementById("exit-trade-modal") as HTMLElement;
  exitModal.onclick = () => closeTradeModal();


}

function closeTradeModal(): void {
  const editModal = document.getElementById("trade-modal") as HTMLElement;
  editModal.classList.add("hidden");
}



export {
  renderNeighborGrid
};