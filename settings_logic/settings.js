import { loadCurrentUser, updateUser } from "../user_logic/user-utils.js";
function settings_init() {
    preFillFields();
    const updateForm = document.getElementById("update-form");
    if (updateForm) {
        updateForm.addEventListener("submit", (event) => {
            event.preventDefault();
            saveSettings();
        });
    }
}
function preFillFields() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const user = result.user;
    const usernamePrefill = document.getElementById("signup-username");
    if (usernamePrefill) {
        usernamePrefill.value = user.username;
    }
    const emailPrefill = document.getElementById("form-email");
    if (emailPrefill) {
        emailPrefill.value = user.email;
    }
    const passwordPrefill = document.getElementById("form-password");
    if (passwordPrefill) {
        passwordPrefill.value = user.password;
    }
    const streetPrefill = document.getElementById("form-street");
    if (streetPrefill) {
        streetPrefill.value = user.street;
    }
    const cityPrefill = document.getElementById("form-city");
    if (cityPrefill) {
        cityPrefill.value = user.city;
    }
    const statePrefill = document.getElementById("form-state");
    if (statePrefill) {
        statePrefill.value = user.state;
    }
    const zipPrefill = document.getElementById("form-zip");
    if (zipPrefill) {
        zipPrefill.value = user.zip;
    }
    const countryPrefill = document.getElementById("form-country");
    if (countryPrefill) {
        countryPrefill.value = user.country;
    }
}
function saveSettings() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const user = result.user;
    const emailInput = document.getElementById("form-email");
    user.email = emailInput.value;
    const passwordInput = document.getElementById("form-password");
    user.password = passwordInput.value;
    const streetInput = document.getElementById("form-street");
    user.street = streetInput.value;
    const cityInput = document.getElementById("form-city");
    user.city = cityInput.value;
    const stateInput = document.getElementById("form-state");
    user.state = stateInput.value;
    const zipInput = document.getElementById("form-zip");
    user.zip = zipInput.value;
    const countryInput = document.getElementById("form-country");
    user.country = countryInput.value;
    updateUser(user);
    toastr.success("Settings Saved!", "Success");
}
export { settings_init };
