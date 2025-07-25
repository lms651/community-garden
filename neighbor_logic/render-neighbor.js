import { loadNeighbor } from "../user_logic/user-utils.js";
import { renderNeighborGrid } from "../garden/neighbor-garden.js";
function render_neighbor_init() {
    const result = loadNeighbor();
    if (!result)
        return;
    const neighbor = result.user;
    // Set the neighbor's name in the title
    const neighborTitle = document.getElementById("neighbor-title");
    if (neighborTitle) {
        neighborTitle.textContent = `${neighbor.username}'s Garden`;
    }
    renderNeighborGrid(neighbor);
}
export { render_neighbor_init };
