//imports
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
import { Validation } from "../classes/validation.js";
import { getUniqueSalt, passwordHash } from "../classes/hash.js";

/**
 * All the logic behind signing up the user
 * @author Julian
 */
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

//validate sign up form on focus out
const validation = new Validation();
const signUpForm = document.querySelector(".sign-up-form");
const inputs = signUpForm.querySelectorAll(".input");
inputs.forEach((input) => {
	input.addEventListener("focusout", async () => {
		const errorDisplay =
			input.getAttribute("data-input") == "password"
				? input.parentElement.nextElementSibling
				: input.nextElementSibling;
		if (input.getAttribute("data-input") == "name") {
			displayError(
				validation.invalidName(input),
				errorDisplay,
				"warningInvalidName",
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
				"warningInvalidEmail",
				input
			);
			if (errorDisplay.textContent != "") {
				return;
			}
			//get emails in database
			displayError(
				await validation.emailInDatabase(input),
				errorDisplay,
				"warningExistingEmail",
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
				"warningPassword",
				passwordInput,
				input
			);
			if (errorDisplay.textContent != "") {
				return;
			}
		}
		displayError(validation.emptyInput(input), errorDisplay, "warningEmpty", input);
	});
});

/**
 * Add new user to database when form is submitted
 */
signUpForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		if (await validateForm(signUpForm, validation)) {
			const values = getInputValues(signUpForm);
			const salt = await getUniqueSalt();
			const hashedPassword = await passwordHash(values.password, salt);
			const data = await FYSCloud.API.queryDatabase(
				"INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `salt`) VALUES (?, ?, ?, ?, ?);",
				[values.firstName, values.lastName, values.email, hashedPassword, salt]
			);
			if (document.querySelector("[data-success]") != null) {
				signUpForm.removeChild(document.querySelector("[data-success]"));
			}
			const div = createSubmitMessage(true, [values.firstName, values.lastName]);
			signUpForm.appendChild(div);
			const inputs = getFormInputs(signUpForm);
			Object.values(inputs).forEach((input) => {
				input.value = "";
			});
			FYSCloud.Localization.translate();
			//login user after sign up
			setTimeout(() => {
				FYSCloud.Session.set("userId", data.insertId);
				FYSCloud.URL.redirect("profiel.html");
			}, 1000);
		} else {
			throw "Submit Error";
		}
	} catch (err) {
		if (document.querySelector("[data-success]") != null) {
			signUpForm.removeChild(document.querySelector("[data-success]"));
		}
		const div = createSubmitMessage(false);
		signUpForm.appendChild(div);
		FYSCloud.Localization.translate();
	}
});

/**
 * display an error message on the page
 * @param {function} errorFunction
 * @param {HTMLParagraphElement} errorElement
 * @param {string} errorMessage
 */
function displayError(errorFunction, errorElement, errorMessage, input, repeatPasswordInput) {
	if (errorFunction) {
		errorElement.setAttribute("data-translate", `signUp.${errorMessage}`);
		input.style.borderColor = "#d81e05";
		FYSCloud.Localization.translate();
		if (repeatPasswordInput != null) {
			repeatPasswordInput.style.borderColor = "#d81e05";
		}
	} else {
		errorElement.removeAttribute("data-translate");
		errorElement.textContent = "";
		input.style.borderColor = "#d9d9d9";
		if (repeatPasswordInput != null) {
			repeatPasswordInput.style.borderColor = "#d9d9d9";
		}
	}
}

/**
 *  Check if all the validation rules are followed by the user when the form is submitted.
 * @param {HTMLFormElement} form
 * @param {Validation} validation
 * @returns true if validation was successful if not return false
 */
async function validateForm(form, validation) {
	const formInputs = getFormInputs(form);
	Object.values(formInputs).forEach((input) => {
		if (validation.emptyInput(input)) {
			return false;
		}
	});
	if (
		validation.invalidName(formInputs.firstName) ||
		validation.invalidName(formInputs.lastName) ||
		(await validation.emailInDatabase(formInputs.email)) ||
		validation.invalidEmail(formInputs.email) ||
		validation.passwordMatch(formInputs.password, formInputs.passwordRepeat)
	) {
		return false;
	}
	return true;
}
/**
 * this function gets the inputs from a form and creates an object
 * @param {HTMLFormElement} form
 * @returns an object containing HTMLInputElements
 */
function getFormInputs(form) {
	return {
		firstName: form.querySelector("#first-name"),
		lastName: form.querySelector("#last-name"),
		email: form.querySelector("#sign-up-email"),
		password: form.querySelector("#sign-up-password"),
		passwordRepeat: form.querySelector("#password-repeat"),
	};
}
/**
 * get value from the all inputs in a form
 * @param {HTMLFormElement} form
 * @returns an object with the value of all inputs
 */
function getInputValues(form) {
	const inputs = getFormInputs(form);
	return {
		firstName: capitalizeName(inputs.firstName.value.trim()),
		lastName: capitalizeName(inputs.lastName.value.trim()),
		email: inputs.email.value.trim(),
		password: inputs.password.value.trim(),
	};
}
/**
 * capitalize the first letter in each word of a name
 * @param {string} name
 * @returns a string with the fist letters capitalized
 */
function capitalizeName(name) {
	return name
		.split(" ")
		.map((word) => {
			//Irish names like O'Reiley
			if (word.charAt(1) == "'") {
				return (
					word.charAt(0).toUpperCase() +
					word.charAt(1) +
					word.charAt(2).toUpperCase() +
					word.slice(3)
				);
			}
			//Dutch and Spanish names uses prefixes that don't need capitalization
			if (
				![
					"van",
					"de",
					"het",
					"der",
					"ten",
					"ter",
					"te",
					"'t",
					"y",
					"del",
					"la",
				].includes(word)
			) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
			return word;
		})
		.join(" ");
}

/**
 * create a message if sign up form is submitted
 * @param {boolean} success is submittion succesful or did an error occur
 * @param {Array<string>} user first and last name of the user
 * @returns {HTMLDivElement} element with message inside
 */
function createSubmitMessage(success, user) {
	const container = document.createElement("div");
	if (success) {
		const [firstName, lastName] = user;
		container.setAttribute("data-success", "true");
		const firstSpan = document.createElement("span");
		const secondSpan = document.createElement("span");
		firstSpan.setAttribute("data-translate", "signUp.submitSuccess.firstSpan");
		secondSpan.setAttribute("data-translate", "signUp.submitSuccess.secondSpan");
		container.textContent = `${firstName} ${lastName}!`;
		container.insertAdjacentElement("afterBegin", firstSpan);
		container.insertAdjacentElement("beforeend", secondSpan);
		return container;
	} else {
		container.setAttribute("data-success", "false");
		container.setAttribute("data-translate", "signUp.submitError");
		return container;
	}
}
