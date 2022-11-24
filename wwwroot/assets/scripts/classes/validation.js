export class Validation {
	constructor() {}

	/**
	 * check if input is empty
	 * @param {HTMLInputElement} input
	 * @returns true if input is empty false if not empty
	 */
	emptyInput(input) {
		return input.value === "";
	}
	/**
	 * Check if name is valid for database
	 * @param {HTMLInputElement} nameInput
	 * @returns return true if name is invalid false if not
	 */
	invalidName(nameInput) {
		//if there aren't any matches the match array is empty. so if the length is 0 the name is invalid
		return nameInput.value.match(/^[\p{L}' -]*$/u) == null;
	}
	/**
	 * check if email is valid
	 * @param {HTMLInputElement} emailInput
	 * @returns true if email is invalid false if not
	 */
	invalidEmail(emailInput) {
		//if there aren't any matches the match array is empty. so if the length is 0 the email is invalid
		const regex =
			/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		return emailInput.value.match(regex) == null;
	}
	/**
	 * check if email already has an account
	 * @param {HTMLInputElement} emailInput email input to check
	 * @param {Array} databaseEmails email that is in the database
	 * @returns true if email is in database false if not
	 */
	emailInDatabase(emailInput, databaseEmails) {
		for (let i = 0; i < databaseEmails.length; i++) {
			if (databaseEmails[i].email == emailInput.value) {
				return true;
			}
		}
		return false;
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
}
