function login_init() {
    const form = document.getElementById("name-input")
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        trySaveName();
        showProfile();
    });
}

function trySaveName() {
    const input = document.getElementById('name-box').value;
    console.log(input);
    if (!localStorage.getItem('name')) {
        localStorage.setItem('name', input);
    } 
    console.log('this was called');
}

function showProfile() {
    const input = document.getElementById('name-box').value
    const savedName = localStorage.getItem('name');
    console.log(input)
    console.log(savedName)
    if (input === savedName) {
    window.location.href = "profile.html";
    } else {
    const userDiv = document.getElementById('welcome-user');
    userDiv.innerHTML = 'You are not a member yet!';
    }
}

export {
    login_init
}