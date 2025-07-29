import { loadCurrentUser } from "../user_logic/user-utils.js";
import { Trade } from "./Trade.js";
import { loadTrades } from "./trades.js";
import { User } from "../user_logic/user.js";
import { removeTrade } from "./trades.js";

const allTrades = loadTrades() ?? [];

function render_trades_init(): void {
  // load current user's trades bc we are only ever rendering the current user's trades
  // users cannot view another user's trades

    const result = loadCurrentUser();
    if (!result) return;
    const currentUser = result.user;
    console.log("current user is:" + currentUser.username);

  // loop through all trades and check for those pertaining to current user
  // i.e., check fromUser and toUser fields
  for (const trade of allTrades) {
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
  div.className = "bg-white shadow p-4 rounded mb-3";
  div.innerHTML = `📅 ${trade.date} — You offered <strong>${trade.toUser}</strong>: ${trade.offeredPlant} for ${trade.requestedPlant}
    <button class="cancel-btn bg-red-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-red-700 transition ml-2">Cancel</button>`;
  container.appendChild(div);

  const cancelBtn = div.querySelector(".cancel-btn") as HTMLButtonElement;
  cancelBtn.addEventListener("click", () => {

    div.remove(); // Simply remove from view
    // update local storage
    trade.status = "canceled";
    removeTrade(trade, allTrades);
    localStorage.setItem("trades", JSON.stringify(allTrades));
  });
}


function renderTradeRequest(trade: Trade, currentUser: User): void {
  const container = document.getElementById("current-requests");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "bg-white shadow p-4 rounded mb-3";
  div.innerHTML = `📅 ${trade.date} — <strong>${trade.fromUser}</strong> wants to trade ${trade.offeredPlant} for ${trade.requestedPlant}
    <div class="mt-2">
      <button class="accept-btn bg-green-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-green-700 transition">Accept</button>
      <button class="decline-btn bg-red-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-red-700 transition ml-2">Decline</button>
    </div>`;
  container.appendChild(div);

  // Now select buttons and add listeners
  const acceptBtn = div.querySelector(".accept-btn") as HTMLButtonElement;
  const declineBtn = div.querySelector(".decline-btn") as HTMLButtonElement;

  acceptBtn.addEventListener("click", () => {
    // Mark as accepted — update trade object
    trade.status = "accepted"; 
    div.remove(); // Remove from current list
    // Add to Accepted section
    renderAcceptedTrade(trade, currentUser); 
    // update local storage
    localStorage.setItem("trades", JSON.stringify(allTrades));
  });

  declineBtn.addEventListener("click", () => {
    trade.status = "rejected";
    div.remove(); // Simply remove from view
    // update local storage
    removeTrade(trade, allTrades);
    localStorage.setItem("trades", JSON.stringify(allTrades));
  });
}

function renderAcceptedTrade(trade: Trade, currentUser: User): void {
  const container = document.getElementById("accepted-trades");
  if (!container) return;

  // Determine if you are from or to user
  const userType = trade.fromUser === currentUser.username ? trade.toUser : trade.fromUser;

  const div = document.createElement("div");
  div.className = "bg-white shadow p-4 rounded mb-3";

  div.innerHTML = `
    📅 ${trade.date} — Trade between <strong>${userType}</strong> and you:
    ${trade.offeredPlant} ↔ ${trade.requestedPlant}
    <div class="mt-2">
      <button class="complete-btn bg-blue-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-700 transition">Mark Complete</button>
      <button class="message-btn bg-yellow-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-yellow-700 transition">Send Message</button>
    </div>`;

  container.appendChild(div);

    const messageBtn = div.querySelector(".message-btn") as HTMLButtonElement;
    messageBtn.addEventListener("click", () => {
      window.location.href = "messages.html";
    })

    const completeBtn = div.querySelector(".complete-btn") as HTMLButtonElement;
    completeBtn.addEventListener("click", () => {
    // Mark as completed — update trade object
    trade.status = "completed"; 
    div.remove(); // Remove from current list
    // Add to Completed section
    renderCompletedTrade(trade, currentUser); 
    // update local storage
    localStorage.setItem("trades", JSON.stringify(allTrades));
  });
}

function renderCompletedTrade(trade: Trade, currentUser: User): void {
  const container = document.getElementById("completed-trades");
  if (!container) return;

    // Determine if you are from or to user
  const userType = trade.fromUser === currentUser.username ? trade.toUser : trade.fromUser;

  const div = document.createElement("div");
  div.className = "bg-white shadow p-4 rounded mb-3";

  div.innerHTML = `
    ✅ ${trade.date} — Trade between <strong>${userType}</strong> and you:
    ${trade.offeredPlant} ↔ ${trade.requestedPlant}
    `;

  container.appendChild(div);
}

export {
  render_trades_init
}