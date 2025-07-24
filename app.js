// import { myGarden, saveGarden, loadGarden, renderGrid } from "./my-garden.js";
import { register_init } from "./register.js";
import { newUser_init } from "./new-user.js";
import { login_init } from "./login.js";
import { render_profile_init } from "./render-profile.js";

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

})