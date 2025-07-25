import { register_init } from "./homepage/register.js";
import { newUser_init } from "./homepage/new-user.js";
import { login_init } from "./homepage/login.js";
import { render_profile_init } from "./user_logic/render-profile.js"
import { render_neighbor_init } from "./neighbor_logic/render-neighbor.js";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    if (body.classList.contains("homepage")) {
        login_init();
        register_init();
        newUser_init();
    }
    
    if (body.classList.contains("profile-page")) {
        render_profile_init();
    }

    if (body.classList.contains("neighbor-page")) {
        render_neighbor_init();
    }

})