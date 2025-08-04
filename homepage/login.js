import { User } from "../user_logic/User.js";
function login_init() {
    const loginBtn = document.getElementById("login-button");
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showLoginModal();
        });
    }
    const exitLogin = document.getElementById("exit-login-modal");
    if (exitLogin) {
        exitLogin.addEventListener('click', () => {
            closeLoginModal();
        });
    }
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const usernameInput = document.getElementById("login-username").value.trim();
            const passwordInput = document.getElementById("login-password").value.trim();
            const success = tryLoginUser(usernameInput, passwordInput);
            if (success) {
                window.location.href = "profile.html";
            }
            else {
                toastr.error("Invalid username/password", "Error");
                closeLoginModal();
            }
        });
    }
    const forgotPass = document.getElementById("forgot-password");
    forgotPass.addEventListener("click", () => {
        toastr.info("Password reset is not implemented yet.");
    });
}
function showLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.classList.remove("hidden");
}
function closeLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.classList.add("hidden");
}
function tryLoginUser(username, password) {
    const usersRaw = localStorage.getItem("users") || "[]";
    const rawUsers = JSON.parse(usersRaw);
    // Find user index
    const userIndex = rawUsers.findIndex((u) => u.username === username && u.password === password);
    if (userIndex !== -1) {
        // Convert raw user object to User instance
        const user = User.fromJson(rawUsers[userIndex]);
        // Save current user index in localstorage
        localStorage.setItem("currentUserIndex", userIndex.toString());
        return true;
    }
    else {
        return false;
    }
}
export { login_init };
