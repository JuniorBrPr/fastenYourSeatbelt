//imports
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
import { Validation } from "../classes/validation.js";
import { passwordHash } from "../hash/hash.js";

const eyeIcons = document.querySelectorAll("[data-eye]");

//Change the eye icon, placeholder and type, to make a password visible or hidden in the input
eyeIcons.forEach((icon) => {
	const input = icon.previousElementSibling;
	icon.addEventListener("click", () => {
		icon.classList.toggle("fa-eye");
		icon.classList.toggle("fa-eye-slash");

		//when fa-eye-slash is visible the placeholder and input need to be visible
		if (icon.classList.contains("fa-eye-slash")) {
			input.placeholder = "superveilig123#";
			input.type = "text";
		} else {
			input.placeholder = "***********";
			input.type = "password";
		}
	});
});

//validate sign up form

const validation = new Validation();
const signUpForm = document.querySelector(".sign-up-form");
const inputs = signUpForm.querySelectorAll(".input");
inputs.forEach((input) => {
	input.addEventListener("focusout", async () => {
		const errorDisplay =
			input.getAttribute("data-input") == "password"
				? input.parentElement.nextElementSibling
				: input.nextElementSibling;
		//check if input is empty
		if (input.getAttribute("data-input") == "name") {
			displayError(
				validation.invalidName(input),
				errorDisplay,
				"Er zijn vreemde karakters gebruikt in uw naam!",
				input
			);
			if (errorDisplay.textContent != "") {
				return;
			}
		}
		if (input.type == "email") {
			displayError(
				validation.invalidEmail(input),
				errorDisplay,
				"Dit is een ongeldig emailadres!",
				input
			);
			if (errorDisplay.textContent != "") {
				return;
			}
			//get emails in database
			const emails = await getEmails();
			displayError(
				validation.emailInDatabase(input, emails),
				errorDisplay,
				"U heeft al een account op dit emailadres",
				input
			);

			if (errorDisplay.textContent != "") {
				return;
			}
		}
		if (input.name == "password-repeat") {
			const passwordInput =
				input.parentElement.parentElement.previousElementSibling.querySelector(
					"input"
				);
			displayError(
				validation.passwordMatch(passwordInput, input),
				errorDisplay,
				"Wachtwoorden zijn niet hetzelfde!",
				passwordInput,
				input
			);
			if (errorDisplay.textContent != "") {
				return;
			}
		}
		displayError(
			validation.emptyInput(input),
			errorDisplay,
			"Veld moet ingevuld zijn!",
			input
		);
		//check if the name inputs are valid
	});
});

// hash password

const hashText = await passwordHash("password", "salt");
console.log(hashText);
const anotherHashText = await passwordHash("password", "pepper");
console.log(anotherHashText);
const test3 = await passwordHash("password", "salt");
console.log(test3);

/**
 *
 * @param {function} errorFunction
 * @param {HTMLParagraphElement} errorElement
 * @param {string} errorMessage
 */
function displayError(
	errorFunction,
	errorElement,
	errorMessage,
	input,
	repeatPasswordInput
) {
	if (errorFunction) {
		errorElement.textContent = errorMessage;
		input.style.borderColor = "#d81e05";
		if (repeatPasswordInput != null) {
			repeatPasswordInput.style.borderColor = "#d81e05";
		}
	} else {
		errorElement.textContent = "";
		input.style.borderColor = "#d9d9d9";
		if (repeatPasswordInput != null) {
			repeatPasswordInput.style.borderColor = "#d9d9d9";
		}
	}
}

async function getEmails() {
	return await FYSCloud.API.queryDatabase("SELECT email from user");
}
