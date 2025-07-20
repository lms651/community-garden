function login_init() {
    const loginBtn = document.getElementById("login-button");
    loginBtn.addEventListener('click', () => {
        showLoginModal();
    });
    const exitLogin = document.getElementById("exit-login-modal");
    exitLogin.addEventListener('click', () => {
        closeLoginModal();
    });
    const loginForm = document.getElementById("login-form");
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
function showLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.classList.remove("hidden");
}
function closeLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.classList.add("hidden");
}
// Locates user based on entered username and password and saves the current user to localstorage
function tryLoginUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = users.find(u => u.username === username && u.password === password);
    if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        console.log("Login successful:", matchedUser);
        return true;
    }
    else {
        console.log("Login failed: invalid credentials");
        return false;
    }
}
export { login_init };
