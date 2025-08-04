import { loadCurrentUser } from '../user_logic/user-utils.js';
import { Trade } from './Trade.js';
import { User } from '../user_logic/User.js';

function handleTrade (currentNeighbor: User, requestedPlantNeighbor: string, offerPlantCurrentUser: string) {
    const result = loadCurrentUser();
    if (!result) return;
    const currentUser = result.user;

    const currentTrade = new Trade(currentUser.username, currentNeighbor.username, offerPlantCurrentUser, requestedPlantNeighbor, "pending")

    // Save trade to local storage
    const trades = JSON.parse(localStorage.getItem("trades") || "[]");
    trades.push(currentTrade.toJSON());
    saveTrades(trades);
}

const loadTrades = (): Trade[] => {
  const tradesRaw = localStorage.getItem("trades");
  if (!tradesRaw) return [];

  const tradesArray = JSON.parse(tradesRaw);
  return tradesArray.map((trade: any) => Trade.fromJSON(trade));
};

const saveTrades = (trades: Trade[]): void => {
  localStorage.setItem("trades", JSON.stringify(trades));
};

function removeTrade(trade: Trade, allTrades: Trade[]): void {

  // Find index by unique date/time
  const index = allTrades.findIndex(t => t.date === trade.date);

  if (index !== -1) {
    allTrades.splice(index, 1);
    saveTrades(allTrades);
  }
}

export {
    handleTrade,
    loadTrades,
    removeTrade,
    saveTrades
}