import { loadCurrentUser, updateUser } from "../user_logic/user-utils.js"

declare const toastr: any;

function settings_init() {
    preFillFields();

    const updateForm = document.getElementById("update-form") as HTMLFormElement | null;
    if (updateForm) {
        updateForm.addEventListener("submit", (event) => {
            event.preventDefault();
            saveSettings();
        });
    }
}

function preFillFields() {

    const result = loadCurrentUser();
    if (!result) return;
    const user = result.user;

    const usernamePrefill = document.getElementById("signup-username") as HTMLInputElement;
    if (usernamePrefill) {
    usernamePrefill.value = user.username;
    }

    const emailPrefill = document.getElementById("form-email") as HTMLInputElement;
    if (emailPrefill) {
    emailPrefill.value = user.email;
    }

    const passwordPrefill = document.getElementById("form-password") as HTMLInputElement;
    if (passwordPrefill) {
    passwordPrefill.value = user.password;
    }

    const streetPrefill = document.getElementById("form-street") as HTMLInputElement;
    if (streetPrefill) {
    streetPrefill.value = user.street;
    }

    const cityPrefill = document.getElementById("form-city") as HTMLInputElement;
    if (cityPrefill) {
    cityPrefill.value = user.city;
    }

    const statePrefill = document.getElementById("form-state") as HTMLInputElement;
    if (statePrefill) {
    statePrefill.value = user.state;
    }

    const zipPrefill = document.getElementById("form-zip") as HTMLInputElement;
    if (zipPrefill) {
    zipPrefill.value = user.zip;
    }

    const countryPrefill = document.getElementById("form-country") as HTMLInputElement;
    if (countryPrefill) {
    countryPrefill.value = user.country;
    }
}

function saveSettings() {
    const result = loadCurrentUser();
    if (!result) return;
    const user = result.user;

    const emailInput = document.getElementById("form-email") as HTMLInputElement;
    user.email = emailInput.value;

    const passwordInput = document.getElementById("form-password") as HTMLInputElement;
    user.password = passwordInput.value;

    const streetInput = document.getElementById("form-street") as HTMLInputElement;
    user.street = streetInput.value;

    const cityInput = document.getElementById("form-city") as HTMLInputElement;
    user.city = cityInput.value;

    const stateInput = document.getElementById("form-state") as HTMLInputElement;
    user.state = stateInput.value;

    const zipInput = document.getElementById("form-zip") as HTMLInputElement;
    user.zip = zipInput.value;

    const countryInput = document.getElementById("form-country") as HTMLInputElement;
    user.country = countryInput.value;

    updateUser(user);
    toastr.success("Settings Saved!", "Success");
}


export {
    settings_init
}