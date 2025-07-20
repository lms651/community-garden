import { login_init } from "./login.js"
import { myGarden, saveGarden, loadGarden, renderGrid } from "./my-garden.js";
import { register_init } from "./register.js";
import { newUser_init } from "./new-user.js";

window.addEventListener("DOMContentLoaded", () => {
    loadGarden();
    register_init();
    newUser_init();
    // login_init();
})