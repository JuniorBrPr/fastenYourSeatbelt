import { Validation } from "./classes/validation.js";
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

/**
 * Code for login validation.
 * 
 * @author Tim Knops
 */
const loginInputField = document.querySelectorAll(".login-input");
const loginSubmitBtn = document.querySelector(".login-content-btn");

const validation = new Validation();

loginSubmitBtn.addEventListener("click", () => {
    loginInputField.forEach((input) => {
        // if (input.type == "email") {
        //     if (validation.invalidEmail(input)) {
        //         displayErrorMessage(false, input);

        //     } else {
        //         displayErrorMessage(true, input);
        //     }
        // }
    
        // else if (input.type == "password") {
        //     if (!passwordValidation(input.value)) {
        //         displayErrorMessage(false, input);

        //     } else {
        //         displayErrorMessage(true, input);
        //     }
        // }

        displayErrorMessage(false, input);
        userExists(input);
    });
});

// function passwordValidation(input) {
//     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;

//     return input.match(regex) != null;
// }

function displayErrorMessage(active, input) {
    const warningMessage = document.querySelector(".warning-message");

    if (!active && warningMessage == null) {
        createErrorMessage();
        input.style.borderColor = "#d81e05";

    } else if (!active && warningMessage != null) {
        input.style.borderColor = "#d81e05";

    } else if (active && warningMessage != null) {
        input.style.borderColor = "";
    }
}

function createErrorMessage() {
    const errorMessage = document.createElement('p');

    errorMessage.classList.add("warning", "warning-message");
    errorMessage.innerHTML = "Wachtwoord en/of email zijn niet gevonden";

    loginSubmitBtn.appendChild(errorMessage);
}

const loginBtn = document.querySelector(".login-content-btn");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents the form from submitting.
})

async function getEmails() {
    return await FYSCloud.API.queryDatabase("SELECT email FROM user");
}

console.log(getEmails());

async function userExists(emailInput) {
    const emails = await getEmails();
    const validEmail = validation.emailInDatabase("echt@email.com", emails);

    for (let i = 0; i < emails.length; i++) {
        console.log(emails[i]);
    }

    console.log(validEmail);
}


// const emails = await getEmails();
// for (let i = 0; i < emails.length; i++) {
//     console.log(i);
// }
