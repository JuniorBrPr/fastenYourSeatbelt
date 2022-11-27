import { Validation } from "./classes/validation.js";

// Login validation	
const loginFormContainer = document.querySelector(".login");
const loginFooter = document.querySelector(".login-content");
const loginInputField = document.querySelectorAll(".login-input");
const loginSubmitBtn = document.querySelector(".login-content-btn");

const validation = new Validation();

loginInputField.forEach((input) => {
	input.addEventListener("focusout", () => {
		if (input.type == "email") {
			if (validation.invalidEmail(input)) {
				displayErrorMessage(false, input);
			} else {
				displayErrorMessage(true, input);
			}
        } else if (input.type == "password") {
			console.log("password");
		}

	});
});

function displayErrorMessage(active, input) {
    const warningMessage = document.querySelector(".warning-message");

    if (!active && warningMessage == null) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add("warning", "warning-message");
        errorMessage.innerHTML = "Email is ongeldig!";
        loginSubmitBtn.appendChild(errorMessage);

        input.style.borderColor = "#d81e05";

    } else if (active && warningMessage != null) {
        warningMessage.remove();

        input.style.borderColor = "";


    }
}