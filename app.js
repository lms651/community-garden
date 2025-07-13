import { login_init } from "./login.js"
import { myGarden, saveGarden, loadGarden, renderGrid } from "./my-garden.js";

window.addEventListener("DOMContentLoaded", () => {
    loadGarden();
    console.log('trying to load garden')

    login_init();
})