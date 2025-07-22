// import { myGarden, saveGarden, loadGarden, renderGrid } from "./my-garden.js";
import { register_init } from "./register.js";
import { newUser_init } from "./new-user.js";
import { login_init } from "./login.js";

window.addEventListener("DOMContentLoaded", () => {
    // loadGarden();
    login_init();
    register_init();
    newUser_init();
})