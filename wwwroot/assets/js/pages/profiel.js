/**
 @Author: Nizar Amine
 DiscordModerators, is101
 **/

import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
import { passwordHash, getUniqueSalt } from "../classes/hash.js";
import { Validation } from "../classes/validation.js";

const validation = new Validation();

const emailBtn = document.querySelector(".updateEmailBtn");
const passwordBtn = document.querySelector(".updatePasswordBtn");
const subBtn = document.querySelector(".saveBtn");
const userId = FYSCloud.Session.get("userId");
const deleteAccountBtn = document.querySelector(".delete-account-btn");

/*Checks if profiel_id exist otherwise it will create*/

subBtn.addEventListener("click", async function (e) {
	// Check if the fields are filled in correctly
	if (checkFields()) {
		if (await profielExist()) {
			await updateData(createObject());
			await updateInterest();
		} else {
			await submitData(createObject());
			await updateInterest();
		}
		location.reload();
	}
});

emailBtn.addEventListener("click", async function (e) {
	if (checkEmailField()) {
		// Email field is valid, update email in the database
		await updateEmail();
	}
});

passwordBtn.addEventListener("click", async function (e) {
	if (checkPasswordField()) {
		await updatePassword();
	}
});
deleteAccountBtn.addEventListener("click", async () => {
	await deleteAccount();
});

await dataLoad();
await outerInterestFunction();
await preSelectOptionField();

async function dataLoad() {
	/*Setting Field vars*/

	const firstNameField = document.getElementById("voornaam");
	const lastNameField = document.getElementById("achternaam");
	const bioField = document.getElementById("bio");
	const birthDateField = document.getElementById("gdatum");
	const destinationField = document.getElementById("bestemming");
	const tijdsbestekStart = document.getElementById("startdate");
	const tijdsbestekEnd = document.getElementById("enddate");
	const genderField = document.getElementById("geslacht-field-1");
	const budgetField = document.getElementById("budget");
	const numberField = document.getElementById("number");

	/* Pulling Data and parsing it into the fields*/

	try {
		const getData = await FYSCloud.API.queryDatabase(
			"SELECT first_name AS firstName,\n" +
				"       last_name AS lastName,\n" +
				"       birthdate as bday,\n" +
				" 		gender,\n" +
				"       biography as bio,\n" +
				"       start_date as startDate,\n" +
				"       end_date as endDate,\n" +
				"       destination,\n" +
				"       budget,\n" +
				"       phone_number AS phoneNumber\n" +
				"FROM user\n" +
				"INNER JOIN profile p on p.profile_id = ?\n" +
				"WHERE user_id = ?;",
			[userId, userId]
		);

		loadData(getData);
	} catch {
		const getData = await FYSCloud.API.queryDatabase(
			"SELECT first_name as firstName, last_name as lastName\n" +
				"FROM user\n" +
				"WHERE user_id = ?",
			[userId]
		);

		loadData(getData);
	}

	/*Load all data in the right fields on Profile page*/

	function loadData(data) {
		firstNameField.value = data[0].firstName;
		lastNameField.value = data[0].lastName;
		if (data[0].bio != null) {
			bioField.value = data[0].bio;
			destinationField.value = data[0].destination;

			const bday = data[0].bday;
			const tijdEnd = data[0].endDate;
			const tijdStart = data[0].startDate;

			const birthday = change(bday);
			const tijdEndDate = change(tijdEnd);
			const tijdStartDate = change(tijdStart);

			birthDateField.value = birthday;
			tijdsbestekStart.value = tijdStartDate;
			tijdsbestekEnd.value = tijdEndDate;
			genderField.value = data[0].gender;
			budgetField.value = data[0].budget;
			numberField.value = data[0].phoneNumber;
		}
	}

	/*Change Time Value to the required format */

	function change(date) {
		const changeDate = new Date(date);
		const getYear = changeDate.getFullYear();
		const getMonth = (changeDate.getMonth() + 1).toString().padStart(2, 0);
		// same logic as month only getDate weirdly does start at 1
		const getDay = changeDate.getDate().toString().padStart(2, 0);
		//correct format for date input
		return `${getYear}-${getMonth}-${getDay}`;
	}
}

/*Submit data to the database if user has a profile*/

async function updateData(data) {
	console.log(data.startDate);
	data.bday = FYSCloud.Utils.toSqlDatetime(new Date(data.bday));
	data.startDate = FYSCloud.Utils.toSqlDatetime(new Date(data.startDate));
	data.endDate = FYSCloud.Utils.toSqlDatetime(new Date(data.endDate));

	const updateUserData = await FYSCloud.API.queryDatabase(
		"UPDATE user\n" +
			"SET    first_name = ?,\n" +
			"       last_name = ?\n" +
			"WHERE user_id = ?",
		[data.firstName, data.lastName, userId]
	);

	const updateProfileData = await FYSCloud.API.queryDatabase(
		"UPDATE profile\n" +
			"SET    birthdate = ?,\n" +
			"       gender =    ?,\n" +
			"       biography = ?,\n" +
			"       start_date = ?,\n" +
			"       end_date = ?,\n" +
			"       destination = ?,\n" +
			"       budget = ?,\n" +
			"       phone_number = ?\n" +
			"WHERE profile_id = ?;",
		[
			data.bday,
			data.gender,
			data.bio,
			data.startDate,
			data.endDate,
			data.destination,
			data.budget,
			data.phoneNumber,
			userId,
		]
	);

	const saveBtn = document.querySelector(".Btn-opslaan");

	const errorMessage = "Profile saved!";
	saveBtn.insertAdjacentHTML(
		"afterend",
		"<p class='error-message valid'>" + errorMessage + "</p>"
	);
}

/* Create an Object filled with values to be used in a Update/SubmitData function*/

function createObject() {
	return {
		firstName: document.getElementById("voornaam").value,
		lastName: document.getElementById("achternaam").value,
		bday: document.getElementById("gdatum").value,
		gender: document.getElementById("geslacht-field-1").value,
		bio: document.getElementById("bio").value,
		destination: document.getElementById("bestemming").value,
		budget: document.getElementById("budget").value,
		phoneNumber: document.getElementById("number").value,
		startDate: document.getElementById("startdate").value,
		endDate: document.getElementById("enddate").value,
	};
}

/*Checks if user has a profile_id,
 if not an if statement will be fired to select which function
* needs to be used. IF statement used in line 6 */

async function profielExist() {
	const data = await FYSCloud.API.queryDatabase(
		" SELECT `profile_id`" + " FROM `profile`" + " WHERE `profile_id` = ?;",
		[userId]
	);
	return data.length > 0;
}

/*Submit data if user has no profile,
this will create a profile_id filled with profile related data */

async function submitData(data) {
	data.bday = FYSCloud.Utils.toSqlDatetime(new Date(data.bday));
	data.startDate = FYSCloud.Utils.toSqlDatetime(new Date(data.startDate));
	data.endDate = FYSCloud.Utils.toSqlDatetime(new Date(data.endDate));

	const insertProfileData = await FYSCloud.API.queryDatabase(
		"INSERT INTO profile (profile_id, birthdate, gender, biography, start_date, end_date, destination, budget, phone_number) " +
			"VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? );",
		[
			userId,
			data.bday,
			data.gender,
			data.bio,
			data.startDate,
			data.endDate,
			data.destination,
			data.budget,
			data.phoneNumber,
		]
	);
	const saveBtn = document.querySelector(".Btn-opslaan");

	const errorMessage = "Profile saved!";
	saveBtn.insertAdjacentHTML(
		"afterend",
		"<p class='error-message valid'>" + errorMessage + "</p>"
	);
}

/*Function to be called to load in the interesse Fields
 * with the correct values from the database,
 * this is not user saved data.*/

async function outerInterestFunction() {
	const selectElements = document.querySelectorAll(".inter-field");

	const getInterest = await FYSCloud.API.queryDatabase(
		"SELECT interest_name as inter " + "FROM interest;\n"
	);

	for (let i = 0; i < selectElements.length; i++) {
		await preLoadInterFields(selectElements[i], getInterest);
	}
}

/*Populates the SELECT fields upon page loading*/

async function preLoadInterFields(selectElements, data) {
	for (let i = 0; i < data.length; i++) {
		const option = document.createElement("option");
		option.classList.add("opt");

		option.value = data[i].inter;
		option.text = data[i].inter;

		selectElements.appendChild(option);
	}
}

/*This function will pre select the user saved values into the Interest
 * elements.*/

async function preSelectOptionField() {
	const selectElements = document.querySelectorAll(".inter-field");

	// Query the database to find the interest_name values associated with the profile_id
	const getUserInterest = await FYSCloud.API.queryDatabase(
		"SELECT i.interest_name AS inter \n" +
			"FROM user_interest AS ui\n" +
			"INNER JOIN interest AS i ON ui.interest_id = i.interest_id\n" +
			"WHERE ui.profile_id = ?;",
		[userId]
	);

	const userInterests = getUserInterest.map((interest) => interest.inter);
	selectElements.forEach((selectElement, i) => {
		selectElement.value = userInterests[i] || selectElement.selectedOptions[0].value;
	});
}

/*
This function deletes the existing interest,
 to hold the maximum interest threshold. Could be updated upon
 feedback.
* */
async function updateInterest() {
	const selectElements = document.querySelectorAll(".inter-field");
	const updatedInterests = Array.from(selectElements).map(
		(selectElement) => selectElement.value
	);
	const hasDuplicates = new Set(updatedInterests).size !== updatedInterests.length;

	if (!hasDuplicates) {
		await FYSCloud.API.queryDatabase("DELETE FROM user_interest WHERE profile_id = ?", [
			userId,
		]);

		// Loop over the updated interests and insert the maximum interest
		for (const interest of updatedInterests) {
			const result = await FYSCloud.API.queryDatabase(
				"SELECT interest_id FROM interest WHERE interest_name = ?",
				[interest]
			);
			const interestId = result[0].interest_id;

			// Insert the updated interest
			await FYSCloud.API.queryDatabase(
				"INSERT INTO user_interest (profile_id, interest_id) VALUES (?, ?)",
				[userId, interestId]
			);

			if (updatedInterests.indexOf(interest) === 6) {
				break;
			}
		}
	}
}

/*Functions displays an error message under the field,
 * takes arguments input which is the field element,
 * message which is the error message. It checks if
 * there is already an error message if yes, removes it
 * if not it adds error message*/

function showErrorMessage(input, message) {
	const existingErrorMessage = input.nextSibling;
	if (
		existingErrorMessage &&
		existingErrorMessage.classList &&
		existingErrorMessage.classList.contains("error-message")
	) {
		existingErrorMessage.remove();
	}
	input.insertAdjacentHTML("afterend", `<p class='error-message'>${message}</p>`);
}

function removeErrorMessage(input) {
	const existingErrorMessage = input.nextSibling;
	if (
		existingErrorMessage &&
		existingErrorMessage.classList &&
		existingErrorMessage.classList.contains("error-message")
	) {
		existingErrorMessage.remove();
	}
}

function validateField(input, errorMessage) {
	if (!validation.emptyInput(input) && !validation.invalidName(input)) {
		removeErrorMessage(input);
		return true;
	} else {
		showErrorMessage(input, errorMessage);
		return false;
	}
}

function validateDates() {
	const startDateInput = document.getElementById("startdate");
	const endDateInput = document.getElementById("enddate");

	const startDate = new Date(startDateInput.value);
	const endDate = new Date(endDateInput.value);

	if (endDate < startDate) {
		showErrorMessage(endDateInput, "Please enter start-date before the end-date");
		return false;
	} else {
		removeErrorMessage(endDateInput);
		return true;
	}
}

function validateNumberField(fieldId) {
	const input = document.getElementById(fieldId);
	const regex = /^\d{0,11}$/;

	if (regex.test(input.value)) {
		removeErrorMessage(input);
		return true;
	} else {
		showErrorMessage(input, "Please enter only digits in this field and valid number.");
		return false;
	}
}

function validateBudgetField(fieldId) {
	const input = document.getElementById(fieldId);
	const regex = /^\d*$/;

	if (regex.test(input.value)) {
		removeErrorMessage(input);
		return true;
	} else {
		showErrorMessage(input, "Please enter only digits in this field.");
		return false;
	}
}

function validateInterest() {
	const selectElements = document.querySelectorAll(".inter-field");
	const divInter = document.getElementById("divInter");

	if (validation.validateInterest(selectElements)) {
		selectElements.forEach((element) => {
			removeErrorMessage(element);
		});
		return true;
	} else {
		showErrorMessage(divInter, "Please don't use the same interest more then once.");
		return false;
	}
}

function checkFields() {
	const isValidVoornaam = validateField(
		document.getElementById("voornaam"),
		"Please enter only letters (A-Z) in this field."
	);
	const isValidAchternaam = validateField(
		document.getElementById("achternaam"),
		"Please enter only letters (A-Z) in this field."
	);
	const isValidBestemming = validateField(
		document.getElementById("bestemming"),
		"Please enter only letters (A-Z) in this field."
	);
	const isValidDate = validateDates();
	const isValidNumber = validateNumberField("number");
	const isValidBudget = validateBudgetField("budget");

	const selectElements = document.querySelectorAll(".inter-field");
	const isValidInterest = validateInterest(selectElements);

	if (
		isValidVoornaam &&
		isValidAchternaam &&
		isValidBestemming &&
		isValidDate &&
		isValidNumber &&
		isValidBudget &&
		isValidInterest
	) {
		return true;
	} else {
		return false;
	}
}

document.getElementById("voornaam").addEventListener("input", () => {
	validateField(
		document.getElementById("voornaam"),
		"Please enter only letters (A-Z) in this field."
	);
	removeErrorMessage(document.getElementById("voornaam"));
});

document.getElementById("achternaam").addEventListener("input", () => {
	validateField(
		document.getElementById("achternaam"),
		"Please enter only letters (A-Z) in this field."
	);
	removeErrorMessage(document.getElementById("achternaam"));
});

document.getElementById("bestemming").addEventListener("input", () => {
	validateField(
		document.getElementById("bestemming"),
		"Please enter only letters (A-Z) in this field."
	);
	removeErrorMessage(document.getElementById("bestemming"));
});

document.getElementById("number").addEventListener("input", () => {
	validateNumberField("number");
	removeErrorMessage(document.getElementById("number"));
});

document.getElementById("budget").addEventListener("input", () => {
	validateBudgetField("budget");
	removeErrorMessage(document.getElementById("budget"));
});

const selectElements = document.querySelectorAll(".inter-field");
selectElements.forEach((element) => {
	element.addEventListener("input", () => {
		validateInterest(selectElements);
		removeErrorMessage(element);
	});
});

/*function allows the user to update their email address in the database.
It first checks if the email is already in use, and if it is, it displays an error message.
If the email is not in use, it updates the email in the database and displays a confirmation message.*/

async function updateEmail() {
	const validation = new Validation();

	const emailInput = document.getElementById("emailAcc");

	const email = emailInput.value;

	try {
		const emailInDatabase = await validation.emailInDatabase(emailInput);
		if (emailInDatabase) {
			showErrorMessage(emailInput, "This email is already in use.");
		} else {
			// Update the email in the database
			await FYSCloud.API.queryDatabase("UPDATE user SET email = ? WHERE user_id = ?", [
				email,
				userId,
			]);
			const errorMessage = "Email saved!";
			emailBtn.insertAdjacentHTML(
				"afterend",
				"<p class='error-message valid'>" + errorMessage + "</p>"
			);
		}
	} catch (error) {
		console.error(error);
		showErrorMessage(emailInput, "An error occurred while updating the email.");
	}
}

/* function allows the user to update their password in the database.
It retrieves the salt value for the user from the database and uses it to generate a hashed version of the password.
The hashed password is then updated in the database and a confirmation message is displayed.*/

async function updatePassword() {
	const passwordInput = document.getElementById("passwordAcc");

	const password = passwordInput.value;

	const result = await FYSCloud.API.queryDatabase(
		"SELECT salt FROM user WHERE user_id = ?",
		[userId]
	);

	const mySalt = result[0].salt;

	const hashedPassword = await passwordHash(password, mySalt);

	await FYSCloud.API.queryDatabase("UPDATE user SET password = ? WHERE user_id = ?", [
		hashedPassword,
		userId,
	]);

	const errorMessage = "Password saved!";
	passwordBtn.insertAdjacentHTML(
		"afterend",
		"<p class='error-message valid'>" + errorMessage + "</p>"
	);
}

/* this function is used to validate the email input fields before the email is updated.
It checks if the email and repeat email inputs are empty or contain an invalid email,
and if the emails match */

function checkEmailField() {
	const validation = new Validation();

	const emailInput = document.getElementById("emailAcc");
	const repeatEmailInput = document.getElementById("emailRepeat");

	let isValid = true;

	// Validate email field
	if (validation.emptyInput(emailInput)) {
		showErrorMessage(emailInput, "Please fill in a email.");
		isValid = false;
	} else if (validation.invalidEmail(emailInput)) {
		showErrorMessage(emailInput, "Please fill in a valid email.");
		isValid = false;
	} else {
		removeErrorMessage(emailInput);
	}

	if (validation.emptyInput(repeatEmailInput)) {
		showErrorMessage(repeatEmailInput, "Please fill in a repeat email.");
		isValid = false;
	} else if (validation.invalidEmail(repeatEmailInput)) {
		showErrorMessage(repeatEmailInput, "Please fill in a valid repeat email.");
		isValid = false;
	} else if (validation.passwordMatch(emailInput, repeatEmailInput)) {
		showErrorMessage(repeatEmailInput, "Please make sure the emails match.");
		isValid = false;
	} else {
		removeErrorMessage(repeatEmailInput);
	}

	return isValid;
}

/* this function is used to validate the password input fields before the password is updated.
It checks if the password and repeat password inputs are empty,
if the passwords match, and if the password is at least 8 characters long.*/

function checkPasswordField() {
	const validation = new Validation();

	const passwordInput = document.getElementById("passwordAcc");
	const repeatPasswordInput = document.getElementById("passwordRepeat");

	let isValid = true;

	if (validation.emptyInput(passwordInput)) {
		showErrorMessage(passwordInput, "Please fill in a password.");
		isValid = false;
	} else if (passwordInput.value.length < 8) {
		showErrorMessage(passwordInput, "Please enter a password with at least 8 characters.");
		isValid = false;
	} else {
		removeErrorMessage(passwordInput);
	}

	if (validation.emptyInput(repeatPasswordInput)) {
		showErrorMessage(repeatPasswordInput, "Please fill in a repeat password.");
		isValid = false;
	} else if (validation.passwordMatch(passwordInput, repeatPasswordInput)) {
		showErrorMessage(repeatPasswordInput, "Please make sure both passwords match.");
		isValid = false;
	} else {
		removeErrorMessage(repeatPasswordInput);
	}
	return isValid;
}

/**
 * Delete an account from the database, clear the users session and redirect the person back to homepage
 *
 * @author Julian
 */
async function deleteAccount() {
	if (confirm("Are you sure you want to delete your account?")) {
		try {
			const deleted = await FYSCloud.API.queryDatabase(
				"DELETE FROM `user` WHERE `user_id` = ?;",
				[userId]
			);
			FYSCloud.Session.remove("userId");
			FYSCloud.URL.redirect("index.html");
		} catch (err) {
			console.error(err);
		}
	}
}
