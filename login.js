import { User } from "./user.js";
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
                alert("Invalid username or password.");
                closeLoginModal();
            }
        });
    }
}
function showLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.classList.remove("hidden");
}
function closeLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.classList.add("hidden");
}
// Locates user based on entered username and password and saves user's index in memory
// function tryLoginUser(username: string, password: string): boolean {
//   const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
//   const userIndex = users.findIndex(u => u.username === username && u.password === password);
//   if (userIndex !== -1) {
//     localStorage.setItem("currentUserIndex", userIndex.toString());
//     console.log("Login successful:", users[userIndex]);
//     return true;
//   } else {
//     console.log("Login failed: invalid credentials");
//     return false;
//   }
// }
function tryLoginUser(username, password) {
    const usersRaw = localStorage.getItem("users") || "[]";
    const rawUsers = JSON.parse(usersRaw);
    // Find user index first
    const userIndex = rawUsers.findIndex((u) => u.username === username && u.password === password);
    if (userIndex !== -1) {
        // Convert raw user object to User instance
        const user = User.fromJson(rawUsers[userIndex]);
        // Save current user index for session
        localStorage.setItem("currentUserIndex", userIndex.toString());
        console.log("Login successful:", user);
        return true;
    }
    else {
        console.log("Login failed: invalid credentials");
        return false;
    }
}
export { login_init };
