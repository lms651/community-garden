import { loadNeighbor } from "../user_logic/user-utils.js";
import { renderNeighborGrid } from "./neighbor-garden.js";
import { hasMessages } from "../user_logic/user-utils.js";
import { hasRequests } from "../user_logic/user-utils.js";
function render_neighbor_init() {
    const result = loadNeighbor();
    if (!result)
        return;
    const neighbor = result.user;
    // Set the neighbor's name in the title
    const neighborTitle = document.getElementById("neighbor-title");
    if (neighborTitle) {
        neighborTitle.textContent = `${neighbor.username}'s GARDEN`;
    }
    // Render garden
    renderNeighborGrid(neighbor);
    // Nav listeners
    const menuButton = document.getElementById("user-menu-button");
    const userMenuDropdown = document.getElementById('user-menu-dropdown');
    if (menuButton && userMenuDropdown) {
        menuButton.addEventListener('click', () => {
            userMenuDropdown.classList.toggle('hidden');
        });
    }
    // Render any notifications
    if (hasRequests()) {
        const requestsBtn = document.getElementById("neighbor-new-requests-button");
        if (requestsBtn) {
            requestsBtn.classList.remove("hidden");
        }
    }
    if (hasMessages()) {
        const messagesBtn = document.getElementById("neighbor-new-chat-button");
        if (messagesBtn) {
            messagesBtn.classList.remove("hidden");
        }
    }
}
export { render_neighbor_init };
