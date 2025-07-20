function register_init() {
    const registerBtn = document.getElementById("register-button");
    registerBtn.addEventListener('click', () => {
        showRegisterModal();
    });
    const exitRegister = document.getElementById("exit-signup-modal");
    exitRegister.addEventListener('click', () => {
        closeRegisterModal();
    });
}
function showRegisterModal() {
    const registerModal = document.getElementById("signup-modal");
    registerModal.classList.remove("hidden");
}
function closeRegisterModal() {
    const registerModal = document.getElementById("signup-modal");
    registerModal.classList.add("hidden");
}
export { register_init, closeRegisterModal };
