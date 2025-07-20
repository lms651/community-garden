function register_init(): void {
    const registerBtn = document.getElementById("register-button") as HTMLElement;
    registerBtn.addEventListener('click', () => {
        showRegisterModal();
        console.log("register button clicked");
    })

    // const form = document.getElementById("signup-form") as HTMLElement;
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     console.log('got data!');
    // });
}

function showRegisterModal(): void {
    const registerModal = document.getElementById("signup-modal") as HTMLElement;
    registerModal.classList.remove("hidden");
}

export {
    register_init
}