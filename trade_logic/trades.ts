import { loadCurrentUser } from '../user_logic/user-utils.js';
import { loadNeighbor } from '../user_logic/user-utils.js';
import { Trade } from './Trade.js';
import { User } from '../user_logic/user.js';

function handleTrade (currentNeighbor: User, requestedPlantNeighbor: string, offerPlantCurrentUser: string) {
    const result = loadCurrentUser();
    if (!result) return;
    const currentUser = result.user;

    const currentTrade = new Trade(currentUser.username, currentNeighbor.username, offerPlantCurrentUser, requestedPlantNeighbor, "pending")

    // Save trade
    const trades = JSON.parse(localStorage.getItem("trades") || "[]");
    trades.push(currentTrade.toJSON());
    localStorage.setItem("trades", JSON.stringify(trades));
    console.log(trades);
    console.log('trade saved');
}

export {
    handleTrade
}