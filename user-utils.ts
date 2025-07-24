import { User } from "./user.js";

function loadCurrentUser(): { user: User, index: number } | null {
  const indexRaw = localStorage.getItem("currentUserIndex");
  if (indexRaw === null) return null;

  const index = parseInt(indexRaw);
  const usersRaw = localStorage.getItem("users");
  if (!usersRaw) return null;

  const users = JSON.parse(usersRaw);
  const rawUser = users[index];
  if (!rawUser) return null;

  const user = User.fromJson(rawUser); // This will restore gardenMap
  return { user, index };
}

export {
    loadCurrentUser
}

