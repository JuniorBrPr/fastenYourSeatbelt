import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

import { Validation } from "./classes/validation.js";
import { passwordHash } from "./classes/hash.js";

/**
 * Code for login validation.
 * 
 * @author Tim Knops
 */
const loginSubmitBtn = document.querySelector(".login-content-btn");
const loginInput = document.querySelector(".login-input-field");
const passwordInput = document.querySelector(".password-input-field");

const validation = new Validation();

loginSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const existingUser = await userExists(loginInput);

    if (existingUser) {
        const existingUserSalt = await getUserSalt(loginInput);
        const existingUserPassword = await getUserPassword(loginInput);

        const hash = await passwordHash(passwordInput.value, existingUserSalt[0].salt);

        // Removes the error border color if email is found.
        loginInput.style.borderColor = ""; 

        // Compares hash just created and hash in the database.
        if (hash == existingUserPassword[0].password) {
            removeFullErrorMessage(loginInput, passwordInput);

            console.log("LOGGED IN");

            // === USER HAS LOGGED IN ===

        }

    } else {
        displayErrorMessage(loginInput, passwordInput);
    }
});

function displayErrorMessage(loginInput, passwordInput) {
    const warningMessage = document.querySelector(".warning-message");

    if (warningMessage == null) {
        createErrorMessage();
        loginInput.style.borderColor = "#d81e05";
        passwordInput.style.borderColor = "#d81e05";
    }
}

function removeFullErrorMessage(loginInput, passwordInput) {
    const warningMessage = document.querySelector(".warning-message");

    if (warningMessage != null) {
        loginInput.style.borderColor = "";
        passwordInput.style.borderColor = "";
        warningMessage.remove();
    }
}

function createErrorMessage() {
    const errorMessage = document.createElement('p');

    errorMessage.classList.add("warning", "warning-message");
    errorMessage.innerHTML = "Wachtwoord en/of email zijn niet gevonden";

    loginSubmitBtn.appendChild(errorMessage);
}

async function getEmails() {
    return await FYSCloud.API.queryDatabase("SELECT email FROM user");
}

async function getUserSalt(email) {
    return await FYSCloud.API.queryDatabase(
        "SELECT salt FROM user WHERE email = ?", 
        email.value
        );
}

async function getUserPassword(email) {
    return await FYSCloud.API.queryDatabase(
        "SELECT password FROM user WHERE email = ?",
        email.value
    );
}

async function userExists(emailInput) {
    const emails = await getEmails();
    const validEmail = validation.emailInDatabase(emailInput, emails);

    return validEmail;
}
