import { loadCurrentUser } from "./user-utils.js";
import { garden_init } from "../garden/my-garden.js";
import { renderGrid } from "../garden/my-garden.js";
import { hasRequests } from "./user-utils.js";
import { hasMessages } from "./user-utils.js";
function render_profile_init() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const user = result.user;
    garden_init(user);
    renderGrid(user);
    if (hasRequests()) {
        const requestsBtn = document.getElementById("new-requests-button");
        if (requestsBtn) {
            requestsBtn.classList.remove("hidden");
        }
    }
    if (hasMessages()) {
        const messagesBtn = document.getElementById("new-chat-button");
        if (messagesBtn) {
            messagesBtn.classList.remove("hidden");
        }
    }
}
export { render_profile_init };
