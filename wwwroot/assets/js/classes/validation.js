import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
/**
 * Class for validating HTML forms
 * @author Julian
 */
export class Validation {
	constructor() {}

	/**
	 * check if input is empty
	 * @param {HTMLInputElement} input
	 * @returns true if input is empty false if not empty
	 */
	emptyInput(input) {
		return input.value.trim() === "";
	}
	/**
	 * Check if name is valid for database
	 * @param {HTMLInputElement} nameInput
	 * @returns return true if name is invalid false if not
	 */
	invalidName(nameInput) {
		//if there aren't any matches the match array is empty. so if the length is 0 the name is invalid
		return nameInput.value.match(/^[\p{L}' 0-9\\-]*$/u) == null;
	}
	/**
	 * check if email is valid
	 * @param {HTMLInputElement} emailInput
	 * @returns true if email is invalid false if not
	 */
	invalidEmail(emailInput) {
		//if there aren't any matches the match array is empty. so if the length is 0 the email is invalid
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailInput.value.match(regex) == null;
	}
	/**
	 * check if email already has an account
	 * @param {HTMLInputElement} emailInput email input to check
	 * @returns true if email is in database false if not
	 */
	async emailInDatabase(emailInput) {
		const data = await FYSCloud.API.queryDatabase(
			"SELECT `email` FROM `user` WHERE `email` = ?;",
			[emailInput.value]
		);
		return data.length > 0;
	}
	/**
	 *  check if password and repeat password are the same
	 * @param {HTMLInputElement} passwordInput
	 * @param {HTMLInputElement} repeatPasswordInput
	 * @returns false if passwords match true if not
	 */
	passwordMatch(passwordInput, repeatPasswordInput) {
		return !(passwordInput.value == repeatPasswordInput.value);
	}

	/**
	 * Validate the interests field in a form
	 * @param {HTMLCollection} selectElements The select elements in the interests field
	 * @returns {boolean} true if the interests are valid, false if not
	 * @author Nizar
	 */
	validateInterest(selectElements) {
		// Get the updated values from the select elements
		const updatedInterests = Array.from(selectElements).map(selectElement => selectElement.value);

		// Check for duplicates in updatedInterests array
		const hasDuplicates = new Set(updatedInterests).size !== updatedInterests.length;

		if (hasDuplicates) {
			// Add Duplicate interest error to the field
			return false;
		} else {
			// Interests are valid
			return true;
		}
	}
}
