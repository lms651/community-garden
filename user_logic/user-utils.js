import { User } from "./user.js";
import { loadTrades } from "../trade_logic/trades.js";
const loadCurrentUser = () => {
    const indexRaw = localStorage.getItem("currentUserIndex");
    if (indexRaw === null)
        return null;
    const index = parseInt(indexRaw);
    const usersRaw = localStorage.getItem("users");
    if (!usersRaw)
        return null;
    const users = JSON.parse(usersRaw);
    const rawUser = users[index];
    if (!rawUser)
        return null;
    const user = User.fromJson(rawUser);
    return { user, index };
};
const loadNeighbor = () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");
    if (!username)
        return null;
    const usersRaw = localStorage.getItem("users");
    if (!usersRaw)
        return null;
    const users = JSON.parse(usersRaw);
    const index = users.findIndex((u) => u.username === username);
    if (index === -1)
        return null;
    const user = User.fromJson(users[index]);
    return { user, index };
};
const loadUsers = () => {
    const usersRaw = localStorage.getItem("users");
    if (!usersRaw)
        return [];
    const parsed = JSON.parse(usersRaw);
    return parsed.map((rawUser) => User.fromJson(rawUser));
};
function hasMessages() {
    const trades = loadTrades();
    const result = loadCurrentUser();
    if (!result)
        return false;
    const currentUser = result.user;
    return trades.some(trade => trade.status === "accepted" &&
        (trade.fromUser === currentUser.username || trade.toUser === currentUser.username) &&
        trade.messages && trade.messages.length > 0);
}
function hasRequests() {
    var _a;
    const trades = (_a = loadTrades()) !== null && _a !== void 0 ? _a : [];
    const result = loadCurrentUser();
    if (!result)
        return false;
    const currentUser = result.user;
    return trades.some(trade => trade.status === "pending" &&
        trade.toUser === currentUser.username);
}
function updateUser(user) {
    const usersRaw = localStorage.getItem("users");
    if (!usersRaw)
        return;
    const userIndex = localStorage.getItem("currentUserIndex");
    console.log(userIndex);
    const parsedUserIndex = parseInt(userIndex);
    const usersArray = JSON.parse(usersRaw);
    usersArray[parsedUserIndex] = user;
    console.log(user.toJSON());
    localStorage.setItem("users", JSON.stringify(usersArray));
}
export { loadCurrentUser, loadNeighbor, loadUsers, hasMessages, hasRequests, updateUser };
