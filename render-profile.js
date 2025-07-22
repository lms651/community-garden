import { User } from "./user.js";
function getCurrentUserMap() {
    const currentUserJson = localStorage.getItem("currentUser");
    if (currentUserJson) {
        const parsedUser = JSON.parse(currentUserJson);
        const user = User.fromJson(parsedUser);
        const gardenMap = user.objToMap(parsedUser.garden);
        return gardenMap;
    }
    else {
        return new Map();
    }
    ;
}
export { getCurrentUserMap };
