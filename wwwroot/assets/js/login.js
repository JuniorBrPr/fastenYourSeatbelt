import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

import { Validation } from "./classes/validation.js";
import { passwordHash } from "./classes/hash.js";
import { clearLoginValues } from "./app.js";

/**
 * Code for the login functionality. Checks to see if the user is existing in the database. If the user is, then the user id is added to the localStorage.
 *
 * @author Tim Knops
 */

const loginSubmitBtn = document.querySelector(".login-content-btn");
const loginInput = document.querySelector(".login-input-field");
const passwordInput = document.querySelector(".password-input-field");
const loginModal = document.querySelector(".login-container");

const validation = new Validation();

loginSubmitBtn.addEventListener("click", async (e) => {
	e.preventDefault();

	// Checks if the email is present in the database.
	const existingEmail = await emailExists(loginInput);

	if (existingEmail) {
		const existingUserSalt = await getUserSalt(loginInput);
		const existingUserPassword = await getUserPassword(loginInput);

		const hash = await passwordHash(passwordInput.value, existingUserSalt[0].salt);

		// Removes the error border color if email is found.
		loginInput.style.borderColor = "";

		// Compares hash just created and hash in the database.
		if (hash == existingUserPassword[0].password) {
			removeFullErrorMessage(loginInput, passwordInput);

			// === USER HAS LOGGED IN ===

			const userId = await getUserId(hash);

			// Sets the userId in the localstorge = user_id from the database.
			FYSCloud.Session.set("userId", userId[0].user_id);

			// On logout, use FYSCloud.Session.clear(); to remove the userId from the local storage!

			loginModal.style.display = "none";
			clearLoginValues();

			FYSCloud.URL.redirect("index.html");
		} else {
			displayErrorMessage(loginInput, passwordInput);
		}
	} else {
		displayErrorMessage(loginInput, passwordInput);
	}
});

/**
 * Displays the error message below the submit button and makes the border colors red.
 * @param {HTMLInputElement} loginInput - email inputfield of the login modal.
 * @param {HTMLInputElement} passwordInput - password inputfield of the login modal.
 */
function displayErrorMessage(loginInput, passwordInput) {
	const warningMessage = document.querySelector(".warning-message");

	if (warningMessage == null) {
		createErrorMessage();
		loginInput.style.borderColor = "#d81e05";
		passwordInput.style.borderColor = "#d81e05";
	}
}

/**
 * Removes the complete error message that was made using displayErrorMessage.
 * @see displayErrorMessage()
 * @param {HTMLInputElement} loginInput - email inputfield of the login modal.
 * @param {HTMLInputElement} passwordInput - password inputfield of the login modal.
 */
function removeFullErrorMessage(loginInput, passwordInput) {
	const warningMessage = document.querySelector(".warning-message");

	if (warningMessage != null) {
		loginInput.style.borderColor = "";
		passwordInput.style.borderColor = "";
		warningMessage.remove();
	}
}

/**
 * Creates the error message that is displayed using displayErrorMessage.
 * @see displayErrorMessage()
 */
function createErrorMessage() {
	const errorMessage = document.createElement("p");

	errorMessage.classList.add("warning", "warning-message");
	errorMessage.innerHTML = "Wachtwoord en/of email zijn niet gevonden";

	loginSubmitBtn.appendChild(errorMessage);
}

/**
 * Uses the email input from the user to get the user salt from the database.
 * @param {HTMLInputElement} email - input field from the login modal.
 * @returns {Promise<string[]>} promise with an array of a salt string.
 */
async function getUserSalt(email) {
	return await FYSCloud.API.queryDatabase(
		"SELECT salt FROM user WHERE email = ?",
		email.value
	);
}

/**
 * Gets the hashed password that is matching in the email from the database.
 * @param {HTMLInputElement} email - input field from the login modal.
 * @returns {Promise<string[]>} the hashed password that is in the database and matches the user input email.
 */
async function getUserPassword(email) {
	return await FYSCloud.API.queryDatabase(
		"SELECT password FROM user WHERE email = ?",
		email.value
	);
}

/**
 * Checks to see whether the email matches an email that is in the database.
 * @param {HTMLInputElement} emailInput - input field from the login modal.
 * @returns {Promise<boolean>} true if the email is present in the database, else false.
 */
async function emailExists(emailInput) {
	const validEmail = await validation.emailInDatabase(emailInput);
	return validEmail;
}

/**
 * Finds the user_id from the database that matches the hash argument.
 * @param {string} hash - hashed password of the current user.
 * @returns {Promise<int[]>} the user id from the database that matches the hash.
 */
async function getUserId(hash) {
	return await FYSCloud.API.queryDatabase(
		"SELECT user_id FROM user WHERE password = ?",
		hash
	);
}
