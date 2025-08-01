
import { loadCurrentUser } from "./user-utils.js";
import { garden_init } from "../garden/my-garden.js";
import { renderGrid } from "../garden/my-garden.js";
import { loadTrades } from "../trade_logic/trades.js";

function render_profile_init() {
  const result = loadCurrentUser();
  if (!result) return;

  const user = result.user;
  garden_init(user);
  renderGrid(user);

  if (hasRequests()) {
    const requestsBtn = document.getElementById("new-requests-button");
    if (requestsBtn) {
      requestsBtn.classList.remove("hidden");
    }
  }

  if (hasMessages()) {
    const messagesBtn = document.getElementById("new-chat-button");
    if (messagesBtn) {
      messagesBtn.classList.remove("hidden");
    }
  }

function hasMessages(): boolean {
  const trades = loadTrades();
  const result = loadCurrentUser();
  if (!result) return false;

  const currentUser = result.user;

  return trades.some(trade =>
  trade.status === "accepted" &&
  (trade.fromUser === currentUser.username || trade.toUser === currentUser.username) &&
  trade.messages && trade.messages.length > 0
  );
  }
}

function hasRequests(): boolean {
  const trades = loadTrades() ?? [];
  const result = loadCurrentUser();
  if (!result) return false;

  const currentUser = result.user;

  return trades.some(trade =>
    trade.status === "pending" &&
    trade.toUser === currentUser.username
  );
}

export {
  render_profile_init
}
