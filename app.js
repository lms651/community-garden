import { register_init } from "./homepage/register.js";
import { newUser_init } from "./homepage/new-user.js";
import { login_init } from "./homepage/login.js";
import { render_profile_init } from "./user_logic/render-profile.js"
import { render_neighbor_init } from "./neighbor_logic/render-neighbor.js";
import { render_trades_init } from "./trade_logic/render-trades.js";
import { initMap } from "./maps/map.js";
import { filter_map_init, init_profile_map } from "./maps/profile-map.js";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;


    if (body.classList.contains("homepage")) {
        initMap();
        login_init();
        register_init();
        newUser_init();

    }
    
    if (body.classList.contains("profile-page")) {
        render_profile_init();
        init_profile_map();
        filter_map_init();
    }

    if (body.classList.contains("neighbor-page")) {
        render_neighbor_init();
    }

    if (body.classList.contains("trades-page")) {
        render_trades_init();
    }


})