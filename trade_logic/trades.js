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
    localStorage.setItem("trades", JSON.stringify(trades));
    console.log(trades);
    console.log('trade saved');
}
function loadTrades() {
    const tradesRaw = localStorage.getItem("trades");
    if (!tradesRaw)
        return [];
    const tradesArray = JSON.parse(tradesRaw);
    return tradesArray.map((trade) => Trade.fromJSON(trade));
}
export { handleTrade, loadTrades };
