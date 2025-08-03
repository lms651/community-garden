import { initMap } from "../maps/map.js";
import { loadUsers } from "../user_logic/user-utils.js";
import { User } from "../user_logic/user.js";
import { closeRegisterModal } from "./register.js";

declare const toastr: any;


function newUser_init() {
    const signUpForm = document.getElementById("signup-form") as HTMLFormElement | null;
    if (signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const usernameInput = (document.getElementById("signup-username") as HTMLInputElement).value.trim();

            const users = loadUsers(); // Load existing users from storage
            const usernameExists = users.some((user: User) => user.username === usernameInput);

            if (usernameExists) {
                toastr.error("Username already exists!", "Error:");
                return; // Don't continue with saving
            }

            const emailInput = (document.getElementById("signup-email") as HTMLInputElement).value.trim();
            const streetInput = (document.getElementById("signup-street") as HTMLInputElement).value.trim();
            const cityInput = (document.getElementById("signup-city") as HTMLInputElement).value.trim();
            const zipInput = (document.getElementById("signup-zip") as HTMLInputElement).value.trim();
            const stateInput = (document.getElementById("signup-state") as HTMLInputElement).value.trim();
            const countryInput = (document.getElementById("signup-country") as HTMLInputElement).value.trim();
            const passwordInput = (document.getElementById("signup-password") as HTMLInputElement).value.trim();

            const newUser = new User(User.getNextId(), usernameInput, emailInput, streetInput, cityInput, stateInput, zipInput, countryInput, passwordInput)
            saveUser(newUser);
            toastr.success("Welcome to the Community!", "Success:");
            closeRegisterModal();
            initMap();
    });
    }
}

function saveUser(newUser: User): void {
    console.log(newUser);
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}

export {
    newUser_init
}
