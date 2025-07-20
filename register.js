function register_init() {
    const registerBtn = document.getElementById("register-button");
    registerBtn.addEventListener('click', () => {
        showRegisterModal();
        console.log("register button clicked");
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
