import { loadCurrentUser } from "../user_logic/user-utils.js";
import { Trade } from "./Trade.js";
import { loadTrades } from "./trades.js";
import { User } from "../user_logic/user.js";

function render_trades_init(): void {
  // load current user's trades bc we are only ever rendering the current user's trades
  // users cannot view another user's trades

    const result = loadCurrentUser();
    if (!result) return;
    const currentUser = result.user;
    console.log("current user is:" + currentUser.username);

  // load the array of current trades

    const allTrades = loadTrades();
    if (!allTrades) return;

  // loop through all trades and check for those pertaining to current user
  // i.e., check fromUser and toUser fields

  for (const trade of allTrades) {
    if (trade.fromUser === currentUser.username) {
    // This is a trade I initiated and goes in "Current Offers"
    renderTradeOffer(trade, currentUser);
    } else if (trade.toUser === currentUser.username) {
    // Someone sent me a trade and goes in "Incoming Requests"
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
    <button class="bg-red-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-red-700 transition ml-2">Cancel</button>`;
  container.appendChild(div);
}


function renderTradeRequest(trade: Trade, currentUser: User): void {
  const container = document.getElementById("current-requests");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "bg-white shadow p-4 rounded mb-3";
  div.innerHTML = `📅 ${trade.date} — <strong>${trade.fromUser}</strong> wants to trade ${trade.offeredPlant} for ${trade.requestedPlant}
    <div class="mt-2">
      <button class="bg-green-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-green-700 transition">Accept</button>
      <button class="bg-red-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-red-700 transition ml-2">Decline</button>
    </div>`;
  container.appendChild(div);
}

export {
  render_trades_init
}