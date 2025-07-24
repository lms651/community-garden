import { loadCurrentUser } from "./user-utils.js";
import { gardent_init } from "./my-garden.js";
import { renderGrid } from "./my-garden.js";
function render_profile_init() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const currentUserMap = result.user.gardenMap;
    gardent_init(currentUserMap);
    renderGrid(currentUserMap);
}
export { render_profile_init };
