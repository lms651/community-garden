import { loadCurrentUser } from "../user_logic/user-utils.js";
import { Trade } from "./Trade.js";
import { loadTrades, saveTrades, removeTrade } from "./trades.js";
import { User } from "../user_logic/user.js";

const allTrades = loadTrades() ?? [];

function render_trades_init(): void {
    const result = loadCurrentUser();
    if (!result) return;
    const currentUser = result.user;

    // Sort allTrades by descending date
    const sortedTrades = [...allTrades].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Loop through sorted trades
    for (const trade of sortedTrades) {
        if (trade.status === "completed") {
            renderCompletedTrade(trade, currentUser);
        } else if (trade.status === "accepted") {
            renderAcceptedTrade(trade, currentUser);
        } else if (trade.fromUser === currentUser.username) {
            renderTradeOffer(trade, currentUser);
        } else if (trade.toUser === currentUser.username) {
            renderTradeRequest(trade, currentUser);
        }
    }
}

function renderTradeOffer(trade: Trade, currentUser: User): void {
  const container = document.getElementById("current-offers");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "bg-gray-50 shadow p-4 rounded mb-3";
  div.innerHTML = `📅 ${trade.date} — You offered <strong>${trade.toUser}</strong>: ${trade.offeredPlant} for ${trade.requestedPlant}
        <button class="cancel-btn bg-red-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-red-700 transition text-sm">Cancel</button>`;

    container.appendChild(div);

  const cancelBtn = div.querySelector(".cancel-btn") as HTMLButtonElement;
  cancelBtn.addEventListener("click", () => {

    div.remove(); // Remove from display
    // update local storage
    trade.status = "canceled";
    removeTrade(trade, allTrades);
    saveTrades(allTrades);
  });
}


function renderTradeRequest(trade: Trade, currentUser: User): void {
  const container = document.getElementById("current-requests");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "bg-gray-50 shadow p-4 rounded mb-3";
  div.innerHTML = `📅 ${trade.date} — <strong>${trade.fromUser}</strong> wants to trade ${trade.offeredPlant} for ${trade.requestedPlant}
    <div class="mt-2">
      <button class="accept-btn bg-green-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-green-700 transition text-sm">Accept</button>
      <button class="decline-btn bg-red-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-red-700 transition text-sm">Decline</button>
    </div>`;
  container.appendChild(div);

  // Button listeners
  const acceptBtn = div.querySelector(".accept-btn") as HTMLButtonElement;
  const declineBtn = div.querySelector(".decline-btn") as HTMLButtonElement;

  acceptBtn.addEventListener("click", () => {
    // Mark as accepted — update trade object
    trade.status = "accepted"; 
    div.remove(); // Remove from current list
    // Add to Accepted section
    renderAcceptedTrade(trade, currentUser); 
    // update local storage
    saveTrades(allTrades);
  });

  declineBtn.addEventListener("click", () => {
    trade.status = "rejected";
    div.remove(); // Remove from display
    // update local storage
    removeTrade(trade, allTrades);
    saveTrades(allTrades);
  });
}

function renderAcceptedTrade(trade: Trade, currentUser: User): void {
  const container = document.getElementById("accepted-trades");
  if (!container) return;

  // Determine if you are from or to user
  const userType = trade.fromUser === currentUser.username ? trade.toUser : trade.fromUser;

  const div = document.createElement("div");
  div.className = "bg-gray-50 shadow p-4 rounded mb-3";

  div.innerHTML = `
    📅 ${trade.date} — Trade between <strong>${userType}</strong> and you:
    ${trade.offeredPlant} ↔ ${trade.requestedPlant}
    <div class="mt-2 flex flex-wrap gap-2 sm:flex-nowrap">
      <button class="complete-btn bg-green-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-green-700 transition text-sm">Mark Complete</button>
      <button class="message-btn bg-blue-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-blue-700 transition text-sm">Send Message</button>
      <button class="cancel-btn bg-red-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-red-700 transition text-sm">Cancel</button>
    </div>
  `;

  container.appendChild(div);

  const cancelBtn = div.querySelector(".cancel-btn") as HTMLButtonElement;
  cancelBtn.addEventListener("click", () => {

    div.remove(); // Remove from display
    // update local storage
    trade.status = "canceled";
    removeTrade(trade, allTrades);
    saveTrades(allTrades);
  });

    const messageBtn = div.querySelector(".message-btn") as HTMLButtonElement;
    messageBtn.addEventListener("click", () => {
      window.location.href = "messages.html";
    })

    const completeBtn = div.querySelector(".complete-btn") as HTMLButtonElement;
    completeBtn.addEventListener("click", () => {
    // Mark as completed — update trade object
    trade.status = "completed"; 
    div.remove(); // Remove from current list
    trade.messages = []; // Remove from active messages
    // Add to Completed section
    renderCompletedTrade(trade, currentUser); 
    // update local storage
    saveTrades(allTrades);
  });
}

function renderCompletedTrade(trade: Trade, currentUser: User): void {
  const container = document.getElementById("completed-trades");
  if (!container) return;

  // Determine if you are from or to user
  const userType = trade.fromUser === currentUser.username ? trade.toUser : trade.fromUser;

  // Create trade div container with relative positioning
  const div = document.createElement("div");
  div.className = "bg-gray-100 shadow p-4 rounded mb-3 relative";

  // Set inner HTML for the trade text content
  div.innerHTML = `
    ✅ ${trade.date} — Trade between <strong>${userType}</strong> and you:
    ${trade.offeredPlant} ↔ ${trade.requestedPlant}
  `;

  // Create the clear button element
  const button = document.createElement("button");
  button.type = "button";
  button.className = "clear-complete-trade absolute top-2 right-2 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none";
  button.setAttribute("aria-label", "Close");

  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  `;

  div.appendChild(button);

  container.appendChild(div);

  const clearBtn = div.querySelector(".clear-complete-trade") as HTMLButtonElement;
      clearBtn.addEventListener("click", () => {
          div.remove(); // Remove from display but persists in localstorage
      })
}


export {
  render_trades_init
}