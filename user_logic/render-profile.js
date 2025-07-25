import { loadCurrentUser } from "./user-utils.js";
import { garden_init } from "../garden/my-garden.js";
import { renderGrid } from "../garden/my-garden.js";
function render_profile_init() {
    var _a;
    const result = loadCurrentUser();
    if (!result)
        return;
    const user = result.user;
    garden_init(user);
    renderGrid(user);
    (_a = document.getElementById("test-neighbor")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        window.location.href = "neighbor.html";
    });
}
export { render_profile_init };
