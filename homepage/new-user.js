import { initMap } from "../maps/map.js";
import { loadUsers } from "../user_logic/user-utils.js";
import { User } from "../user_logic/user.js";
import { closeRegisterModal } from "./register.js";
function newUser_init() {
    const signUpForm = document.getElementById("signup-form");
    if (signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const usernameInput = document.getElementById("signup-username").value.trim();
            const users = loadUsers(); // Load existing users from storage
            const usernameExists = users.some((user) => user.username === usernameInput);
            if (usernameExists) {
                toastr.error("Username already exists!", "Error:");
                return; // Don't continue with saving
            }
            const emailInput = document.getElementById("signup-email").value.trim();
            const streetInput = document.getElementById("signup-street").value.trim();
            const cityInput = document.getElementById("signup-city").value.trim();
            const zipInput = document.getElementById("signup-zip").value.trim();
            const stateInput = document.getElementById("signup-state").value.trim();
            const countryInput = document.getElementById("signup-country").value.trim();
            const passwordInput = document.getElementById("signup-password").value.trim();
            const newUser = new User(User.getNextId(), usernameInput, emailInput, streetInput, cityInput, stateInput, zipInput, countryInput, passwordInput);
            saveNewUser(newUser);
            toastr.success("Welcome to the Community!", "Success:");
            closeRegisterModal();
            initMap();
        });
    }
}
function saveNewUser(newUser) {
    let users = loadUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}
export { newUser_init };
