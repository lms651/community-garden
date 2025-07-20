import { closeRegisterModal } from "./register";
import { User } from "./user";

function login_init(): void {
    const loginBtn = document.getElementById("login-button") as HTMLButtonElement;
    loginBtn.addEventListener('click', () => {
        showLoginModal();
    })

    const exitLogin = document.getElementById("exit-login-modal") as HTMLButtonElement;
    exitLogin.addEventListener('click', () => {
        closeLoginModal();
    })

    const loginForm = document.getElementById("login-form") as HTMLFormElement;
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const usernameInput = (document.getElementById("login-username") as HTMLInputElement).value.trim();
        const passwordInput = (document.getElementById("login-password") as HTMLInputElement).value.trim();

        const success = tryLoginUser(usernameInput, passwordInput);
        
        if (success) {
            window.location.href = "profile.html";
        } else {
            alert("Invalid username or password.");
            closeLoginModal();
        }

    })

}

function showLoginModal(): void {
    const loginModal = document.getElementById("login-modal") as HTMLElement;
    loginModal.classList.remove("hidden");
}

function closeLoginModal(): void {
    const loginModal = document.getElementById("login-modal") as HTMLElement;
    loginModal.classList.add("hidden");
}


// Locates user based on entered username and password and saves the current user to localstorage
function tryLoginUser(username: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const matchedUser = users.find(u => u.username === username && u.password === password);

    if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        console.log("Login successful:", matchedUser);
        return true;
    } else {
        console.log("Login failed: invalid credentials");
        return false;
    }
    
}


export {
    login_init
}