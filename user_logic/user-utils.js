import { User } from "./user.js";
function loadCurrentUser() {
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
    const user = User.fromJson(rawUser); // This will restore gardenMap
    return { user, index };
}
// function loadNeighbor(): { user: User, index: number } | null {
//   const indexRaw = localStorage.getItem("neighborIndex");
//   if (indexRaw === null) return null;
//   const index = parseInt(indexRaw);
//   const usersRaw = localStorage.getItem("users");
//   if (!usersRaw) return null;
//   const users = JSON.parse(usersRaw);
//   const rawUser = users[index];
//   if (!rawUser) return null;
//   const user = User.fromJson(rawUser); // 
//   return { user, index };
// }
// function loadNeighbor(): { user: User, index: number } | null {
//   const index = 1; // Hardcoded for testing
//   const usersRaw = localStorage.getItem("users");
//   if (!usersRaw) return null;
//   const users = JSON.parse(usersRaw);
//   const rawUser = users[index];
//   if (!rawUser) return null;
//   const user = User.fromJson(rawUser);
//   return { user, index };
// }
function loadNeighbor() {
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
}
function loadUsers() {
    const usersRaw = localStorage.getItem("users");
    if (!usersRaw)
        return [];
    const parsed = JSON.parse(usersRaw);
    return parsed.map((rawUser) => User.fromJson(rawUser));
}
export { loadCurrentUser, loadNeighbor, loadUsers };
