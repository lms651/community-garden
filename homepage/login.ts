import { closeRegisterModal } from "./register";
import { User } from "../user_logic/user.js";

declare const toastr: any;

function login_init(): void {
    const loginBtn = document.getElementById("login-button") as HTMLButtonElement | null;
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
        showLoginModal();
    })
    }

    const exitLogin = document.getElementById("exit-login-modal") as HTMLButtonElement | null;
    if (exitLogin) {
        exitLogin.addEventListener('click', () => {
            closeLoginModal();
        })
    }

    const loginForm = document.getElementById("login-form") as HTMLFormElement | null;
    if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const usernameInput = (document.getElementById("login-username") as HTMLInputElement).value.trim();
        const passwordInput = (document.getElementById("login-password") as HTMLInputElement).value.trim();

        const success = tryLoginUser(usernameInput, passwordInput);
        
        if (success) {
            window.location.href = "profile.html";
        } else {
            toastr.error("Invalid username/password", "Error");
            closeLoginModal();
        }

    })
    }

    const forgotPass = document.getElementById("forgot-password")!;
    forgotPass.addEventListener("click", () => {
    toastr.info("Password reset is not implemented yet.");
});
}

function showLoginModal(): void {
    const loginModal = document.getElementById("login-modal") as HTMLElement;
    loginModal.classList.remove("hidden");
}

function closeLoginModal(): void {
    const loginModal = document.getElementById("login-modal") as HTMLElement;
    loginModal.classList.add("hidden");
}

function tryLoginUser(username: string, password: string): boolean {
  const usersRaw = localStorage.getItem("users") || "[]";
  const rawUsers = JSON.parse(usersRaw);

  // Find user index first
  const userIndex = rawUsers.findIndex((u: any) => u.username === username && u.password === password);
  if (userIndex !== -1) {
    // Convert raw user object to User instance
    const user = User.fromJson(rawUsers[userIndex]);

    // Save current user index for session
    localStorage.setItem("currentUserIndex", userIndex.toString());

    console.log("Login successful:", user);
    return true;
  } else {
    console.log("Login failed: invalid credentials");
    return false;
  }
}


export {
    login_init
}