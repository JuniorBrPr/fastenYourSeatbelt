import { Validation } from "./classes/validation.js";

/**
 * Code for login validation
 * 
 * @author Tim Knops
 */
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
        }
        
        if (input.type == "password") {
            if (!passwordValidation(input.value)) {
                displayErrorMessage(false, input);
            } else {
                displayErrorMessage(true, input);
            }
		}
	});
});

function passwordValidation(input) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;

    return input.match(regex) != null;
}

export function displayErrorMessage(active, input) {
    const warningMessage = document.querySelector(".warning-message");

    if (!active && warningMessage == null) {
        createErrorMessage();

        input.style.borderColor = "#d81e05";

    } else if (!active && warningMessage != null) {
        input.style.borderColor = "#d81e05";
    } else if (active && warningMessage != null) {
        input.style.borderColor = "#26a514";
    }

    checkForColors();
}

function createErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add("warning", "warning-message");
    errorMessage.innerHTML = "Wachtwoord en/of email niet toegestaan";
    loginSubmitBtn.appendChild(errorMessage);
}

function checkForColors() {
    const emailField = document.getElementById("#email");
    const passwordField = document.querySelector(".password");


    console.log(emailField);
    console.log(passwordField);
}