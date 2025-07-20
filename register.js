function register_init() {
    const registerBtn = document.getElementById("register-button");
    registerBtn.addEventListener('click', () => {
        showRegisterModal();
        console.log("register button clicked");
    });
    // const form = document.getElementById("signup-form") as HTMLElement;
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     console.log('got data!');
    // });
}
function showRegisterModal() {
    const registerModal = document.getElementById("signup-modal");
    registerModal.classList.remove("hidden");
}
export { register_init };
