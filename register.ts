import { newUser_init } from "./new-user";

function register_init(): void {
    const registerBtn = document.getElementById("register-button") as HTMLElement;
    registerBtn.addEventListener('click', () => {
        showRegisterModal();
        console.log("register button clicked");
    })
}

function showRegisterModal(): void {
    const registerModal = document.getElementById("signup-modal") as HTMLElement;
    registerModal.classList.remove("hidden");
}

function closeRegisterModal(): void {
    const registerModal = document.getElementById("signup-modal") as HTMLElement;
    registerModal.classList.add("hidden");
}



export {
    register_init,
    closeRegisterModal
}