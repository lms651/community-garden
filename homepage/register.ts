function register_init(): void {
    const registerBtn = document.getElementById("register-button") as HTMLButtonElement | null;
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            showRegisterModal();
        })
    }

    const startSharingBtn = document.getElementById("start-button") as HTMLButtonElement | null;
    if (startSharingBtn) {
        startSharingBtn.addEventListener('click', () => {
            showRegisterModal();
        })
    }

    const exitRegister = document.getElementById("exit-signup-modal") as HTMLButtonElement | null;
    if (exitRegister) {
        exitRegister.addEventListener('click', () => {
            closeRegisterModal();
        })
    }
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