import { User } from "./user.js";
import { closeRegisterModal } from "./register.js";
function newUser_init() {
    const signUpForm = document.getElementById("signup-form");
    if (signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const usernameInput = document.getElementById("signup-username").value.trim();
            const emailInput = document.getElementById("signup-email").value.trim();
            const streetInput = document.getElementById("signup-street").value.trim();
            const cityInput = document.getElementById("signup-city").value.trim();
            const zipInput = document.getElementById("signup-zip").value.trim();
            const stateInput = document.getElementById("signup-state").value.trim();
            const countryInput = document.getElementById("signup-country").value.trim();
            const passwordInput = document.getElementById("signup-password").value.trim();
            const newUser = new User(User.getNextId(), usernameInput, emailInput, streetInput, cityInput, stateInput, zipInput, countryInput, passwordInput);
            saveUser(newUser);
            closeRegisterModal();
        });
    }
}
function saveUser(newUser) {
    console.log(newUser);
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}
export { newUser_init };
