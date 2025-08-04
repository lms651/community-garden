import { loadCurrentUser } from '../user_logic/user-utils.js';
import { Trade } from './Trade.js';
function handleTrade(currentNeighbor, requestedPlantNeighbor, offerPlantCurrentUser) {
    const result = loadCurrentUser();
    if (!result)
        return;
    const currentUser = result.user;
    const currentTrade = new Trade(currentUser.username, currentNeighbor.username, offerPlantCurrentUser, requestedPlantNeighbor, "pending");
    // Save trade to local storage
    const trades = JSON.parse(localStorage.getItem("trades") || "[]");
    trades.push(currentTrade.toJSON());
    saveTrades(trades);
}
const loadTrades = () => {
    const tradesRaw = localStorage.getItem("trades");
    if (!tradesRaw)
        return [];
    const tradesArray = JSON.parse(tradesRaw);
    return tradesArray.map((trade) => Trade.fromJSON(trade));
};
const saveTrades = (trades) => {
    localStorage.setItem("trades", JSON.stringify(trades));
};
function removeTrade(trade, allTrades) {
    // Find index by unique date (if unique)
    const index = allTrades.findIndex(t => t.date === trade.date);
    if (index !== -1) {
        allTrades.splice(index, 1);
        saveTrades(allTrades);
    }
}
export { handleTrade, loadTrades, removeTrade, saveTrades };
