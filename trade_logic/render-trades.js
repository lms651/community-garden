var _a;
import { loadCurrentUser } from "../user_logic/user-utils.js";
import { loadTrades, saveTrades, removeTrade } from "./trades.js";
const allTrades = (_a = loadTrades()) !== null && _a !== void 0 ? _a : [];
function render_trades_init() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const currentUser = result.user;
    // Sort allTrades by descending date
    const sortedTrades = [...allTrades].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Loop through sorted trades
    for (const trade of sortedTrades) {
        if (trade.status === "completed") {
            renderCompletedTrade(trade, currentUser);
        }
        else if (trade.status === "accepted") {
            renderAcceptedTrade(trade, currentUser);
        }
        else if (trade.fromUser === currentUser.username) {
            renderTradeOffer(trade, currentUser);
        }
        else if (trade.toUser === currentUser.username) {
            renderTradeRequest(trade, currentUser);
        }
    }
}
function renderTradeOffer(trade, currentUser) {
    const container = document.getElementById("current-offers");
    if (!container)
        return;
    const div = document.createElement("div");
    div.className = "bg-gray-50 shadow p-4 rounded mb-3";
    div.innerHTML = `📅 ${trade.date} — You offered <strong>${trade.toUser}</strong>: ${trade.offeredPlant} for ${trade.requestedPlant}
        <button class="cancel-btn bg-red-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-red-700 transition text-sm">Cancel</button>`;
    container.appendChild(div);
    const cancelBtn = div.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", () => {
        div.remove(); // Remove from display
        // update local storage
        trade.status = "canceled";
        removeTrade(trade, allTrades);
        saveTrades(allTrades);
    });
}
function renderTradeRequest(trade, currentUser) {
    const container = document.getElementById("current-requests");
    if (!container)
        return;
    const div = document.createElement("div");
    div.className = "bg-gray-50 shadow p-4 rounded mb-3";
    div.innerHTML = `📅 ${trade.date} — <strong>${trade.fromUser}</strong> wants to trade ${trade.offeredPlant} for ${trade.requestedPlant}
    <div class="mt-2">
      <button class="accept-btn bg-green-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-green-700 transition text-sm">Accept</button>
      <button class="decline-btn bg-red-600 text-white px-3 py-1.5 rounded-2xl shadow hover:bg-red-700 transition text-sm">Decline</button>
    </div>`;
    container.appendChild(div);
    // Button listeners
    const acceptBtn = div.querySelector(".accept-btn");
    const declineBtn = div.querySelector(".decline-btn");
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
function renderAcceptedTrade(trade, currentUser) {
    const container = document.getElementById("accepted-trades");
    if (!container)
        return;
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
    const cancelBtn = div.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", () => {
        div.remove(); // Remove from display
        // update local storage
        trade.status = "canceled";
        removeTrade(trade, allTrades);
        saveTrades(allTrades);
    });
    const messageBtn = div.querySelector(".message-btn");
    messageBtn.addEventListener("click", () => {
        window.location.href = "messages.html";
    });
    const completeBtn = div.querySelector(".complete-btn");
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
function renderCompletedTrade(trade, currentUser) {
    const container = document.getElementById("completed-trades");
    if (!container)
        return;
    // Determine if you are from or to user
    const userType = trade.fromUser === currentUser.username ? trade.toUser : trade.fromUser;
    const div = document.createElement("div");
    div.className = "bg-gray-100 shadow p-4 rounded mb-3";
    div.innerHTML = `
    ✅ ${trade.date} — Trade between <strong>${userType}</strong> and you:
    ${trade.offeredPlant} ↔ ${trade.requestedPlant}
    `;
    container.appendChild(div);
}
export { render_trades_init };
